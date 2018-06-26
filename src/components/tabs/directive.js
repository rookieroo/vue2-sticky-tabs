import event from './eventCenter'
var _this
let throttle = function (fn, delay) {
  let now, lastExec, timer, context, args // eslint-disable-line

  let execute = function () {
    fn.apply(context, args)
    lastExec = now
  }

  return function () {
    context = _this
    args = arguments

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      let diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(function () {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}

let getScrollTop = function (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}

let getComputedStyle = document.defaultView.getComputedStyle

let getScrollEventTarget = function (element) {
  let currentNode = element
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

let getElementTop = function (element) {
  if (element === window) {
    return getScrollTop(window)
  }
  return element.getBoundingClientRect().top + getScrollTop(window)
}

let isAttached = function (element) {
  let currentNode = element.parentNode
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true
    }
    if (currentNode.nodeType === 11) {
      return false
    }
    currentNode = currentNode.parentNode
  }
  return false
}

let doBind = function () {
  if (_this.binded) return // eslint-disable-line
  _this.binded = true
  let element = _this
  let tabs = _this.childNodes[0]

  _this.tabsStylePosition = getComputedStyle(tabs).position
  _this.scrollEventTarget = getScrollEventTarget(element)
  // directive.scrollListener = directive.doCheck.bind(directive)
  _this.scrollListener = throttle(doCheck.bind(_this), 100)
  _this.scrollEventTarget.addEventListener('scroll', _this.scrollListener)
}

let doCheck = function () {
  let _this = this
  let scrollEventTarget = _this.scrollEventTarget
  let element = _this
  let tabs = _this.childNodes[0]

  let viewportScrollTop = getScrollTop(scrollEventTarget)
  let elementTop = getElementTop(element)

  let fixedTrigger = false, overTrigger = false // eslint-disable-line

  let offsetDistance = ~~element.getAttribute('tabs-offset') || 0

  fixedTrigger = viewportScrollTop >= elementTop - offsetDistance
  overTrigger = viewportScrollTop >= elementTop + element.offsetHeight - tabs.offsetHeight - offsetDistance

  if (fixedTrigger) {
    if (overTrigger) {
      tabs.style.position = 'absolute'
      tabs.style.top = 'auto'
      tabs.style.bottom = 0
    } else {
      tabs.style.position = 'fixed'
      tabs.style.top = offsetDistance + 'px'
      tabs.style.bottom = 'auto'
    }
    element.style.paddingTop = tabs.offsetHeight + 'px'
  } else {
    tabs.style.position = _this.tabsStylePosition
    tabs.style.top = 'auto'
    tabs.style.bottom = 'auto'
    element.style.paddingTop = 0
  }
}

export default {
  bind(el, binding, vnode, oldVnode) {
    _this = el
    let isFixed = binding.value
    // let isFixed = _this.getAttribute('fixed-tabs')
    isFixed = isFixed || 'true'
    if (isFixed != 'true') return // eslint-disable-line

    event.$on('ready', function () {
      if (isAttached(_this)) {
        doBind()
      }
    })

    _this.bindTryCount = 0

    let tryBind = function () {
      if (_this.bindTryCount > 10) return // eslint-disable-line
      _this.bindTryCount++
      if (isAttached(_this)) {
        doBind()
      } else {
        setTimeout(tryBind, 50)
      }
    }
    tryBind()
  },
  unbind() {
    _this.scrollEventTarget.removeEventListener('scroll', _this.scrollListener)
  }
}
