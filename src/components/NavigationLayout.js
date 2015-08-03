import React from 'react';
import classnames from 'classnames';
import Ripple from './Ripple';

const MAX_WIDTH = '(max-width: 1024px)';
const TAB_SCROLL_PIXELS = 100;
const MENU_ICON = 'menu';
const CHEVRON_LEFT = 'chevron_left';
const CHEVRON_RIGHT = 'chevron_right';

const MODE_STANDARD = 0;
const MODE_SEAMED = 1;
const MODE_WATERFALL = 2;
const MODE_SCROLL = 3;

const CONTAINER = 'mdl-layout__container';
const HEADER = 'mdl-layout__header';
const DRAWER = 'mdl-layout__drawer';
const CONTENT = 'mdl-layout__content';
const DRAWER_BTN = 'mdl-layout__drawer-button';
const ICON = 'material-icons';
const JS_RIPPLE_EFFECT = 'mdl-js-ripple-effect';
const RIPPLE_CONTAINER = 'mdl-layout__tab-ripple-container';
const RIPPLE = 'mdl-ripple';
const RIPPLE_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
const HEADER_SEAMED = 'mdl-layout__header--seamed';
const HEADER_WATERFALL = 'mdl-layout__header--waterfall';
const HEADER_SCROLL = 'mdl-layout__header--scroll';
const FIXED_HEADER = 'mdl-layout--fixed-header';
const OBFUSCATOR = 'mdl-layout__obfuscator';
const TAB_BAR = 'mdl-layout__tab-bar';
const TAB_CONTAINER = 'mdl-layout__tab-bar-container';
const TAB = 'mdl-layout__tab';
const TAB_BAR_BUTTON = 'mdl-layout__tab-bar-button';
const TAB_BAR_LEFT_BUTTON = 'mdl-layout__tab-bar-left-button';
const TAB_BAR_RIGHT_BUTTON = 'mdl-layout__tab-bar-right-button';
const PANEL = 'mdl-layout__tab-panel';
const HAS_DRAWER = 'has-drawer';
const HAS_TABS = 'has-tabs';
const HAS_SCROLLING_HEADER = 'has-scrolling-header';
const CASTING_SHADOW = 'is-casting-shadow';
const IS_COMPACT = 'is-compact';
const IS_SMALL_SCREEN = 'is-small-screen';
const IS_DRAWER_OPEN = 'is-visible';
const IS_ACTIVE = 'is-active';
const IS_UPGRADED = 'is-upgraded';
const IS_ANIMATING = 'is-animating';
const ON_LARGE_SCREEN  = 'mdl-layout--large-screen-only';
const ON_SMALL_SCREEN  = 'mdl-layout--small-screen-only';

class NavigationLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallScreen: false,
      isCompact: false,
      isAnimating: false,
      waterfallCastingShadow: false,
      drawOpen: false,
      leftBarActive: false,
      rightBarActive: false,
      defaultTab: this.props.defaultTab,
    };

    this.matchScreenSize = this.matchScreenSize.bind(this);
    this.contentScrollHandler_ = this.contentScrollHandler_.bind(this);
    this.drawerToggleHandler_ = this.drawerToggleHandler_.bind(this);
    this.onTabBarScroll = this.tabScrollHandler.bind(this);
    // this.tabOnClick = this.tabOnClick.bind(this);
  }

  render() {
    const mode = this.props.mode;
    let mainElementClass = {
      'layout-transparent mdl-layout mdl-js-layout': true,
    };
    mainElementClass[IS_UPGRADED] = true;
    mainElementClass[HAS_DRAWER] = !!this.props.drawer;
    mainElementClass[HAS_TABS] = !!this.props.tabBar;
    if (this.state.smallScreen) {
      mainElementClass[IS_SMALL_SCREEN] = true;
    }

    let headerClass = {
        'mdl-layout__header': true,
        'mdl-layout__header--transparent': mode === 'transparent',
    };

    headerClass[HEADER_SEAMED] = (mode === 'seamed');
    headerClass[HEADER_WATERFALL] = (mode === 'waterfall');
    headerClass[HEADER_SCROLL] = (mode === 'scroll');
    headerClass[CASTING_SHADOW] = (mode === 'standard' || !!this.state.waterfallCastingShadow);
    headerClass[IS_ANIMATING] = !!this.state.isAnimating;
    headerClass[IS_COMPACT] = !!this.state.isCompact;

    let containerClass = {};
    containerClass[CONTAINER] = true;
    containerClass[HAS_SCROLLING_HEADER] = (mode === 'scroll');
    containerClass[HAS_TABS] = this.props.tabBar && this.props.header;

    let tabBar;
    let tabBarClass = {
      'mdl-layout__tab-bar mdl-js-ripple-effect': true,
    };
    tabBarClass[CASTING_SHADOW] = (mode === 'standard');
    tabBarClass[RIPPLE_IGNORE_EVENTS] = !!this.props.ripple;
    if (this.props.tabBar) {
      tabBar = (
        <div ref="tabBar" className={classnames(tabBarClass)} onScroll={this.onTabBarScroll}>
          {this.produceTab()}
        </div>
      );
    }

    let contentOnScroll = null;
    if (mode === 'waterfall') {
      contentOnScroll = this.contentScrollHandler_;
    }

    let drawerClass = {};
    drawerClass[DRAWER] = true;
    drawerClass[IS_DRAWER_OPEN] = !!this.state.drawOpen;

    let drawerBtn = null;
    let fixedDrawerBtn = null;
    if (!!this.props.drawer && !this.props.fixedHeader) {
      drawerBtn = (
        <div className={DRAWER_BTN} onClick={this.drawerToggleHandler_}>
          <i className={ICON}>{MENU_ICON}</i>
        </div>
      );
    } else if (!!this.props.drawer && !!this.props.fixedHeader) {
      fixedDrawerBtn = (
        <div className={DRAWER_BTN} onClick={this.drawerToggleHandler_}>
          <i className={ICON}>{MENU_ICON}</i>
        </div>
      );
    }

    let leftTabBarClass = {};
    leftTabBarClass[TAB_BAR_BUTTON] = true;
    leftTabBarClass[TAB_BAR_LEFT_BUTTON] = true;
    leftTabBarClass[IS_ACTIVE] = this.state.leftBarActive;

    let rightTabBarClass = {};
    rightTabBarClass[TAB_BAR_BUTTON] = true;
    rightTabBarClass[TAB_BAR_RIGHT_BUTTON] = true;
    rightTabBarClass[IS_ACTIVE] = this.state.rightBarActive;

    let tabContainer;
    if (this.props.tabBar && (this.props.header || this.props.fixedHeader)) {
      tabContainer = (
        <div className={TAB_CONTAINER}>
          <div className={classnames(leftTabBarClass)} onClick={this.leftTabClick.bind(this)}>
            <i className={ICON}>{CHEVRON_LEFT}</i>
          </div>
          {tabBar}
          <div className={classnames(rightTabBarClass)} onClick={this.rightTabClick.bind(this)}>
            <i className={ICON}>{CHEVRON_RIGHT}</i>
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(containerClass)}>
        <div ref="mainElement" className={classnames(mainElementClass)} style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
          <header ref="header" className={classnames(headerClass)}>
            {fixedDrawerBtn}
            <div className="mdl-layout__header-row">

              <span className="mdl-layout-title">Title</span>

              <div className="mdl-layout-spacer"></div>

              <nav className="mdl-navigation">
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
                <a className="mdl-navigation__link" href="">Link</a>
              </nav>
            </div>
            {tabContainer}
          </header>
          <div className={classnames(drawerClass)}>
            <span className="mdl-layout-title">Title</span>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
          {drawerBtn}
          <main ref="content" className="mdl-layout__content" onScroll={contentOnScroll}>
          </main>
          <div className={OBFUSCATOR} onClick={this.drawerToggleHandler_}></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.mainElement = this.refs.mainElement.getDOMNode();
    this.screenQuery = window.matchMedia(MAX_WIDTH);
    this.screenQuery.addListener(this.matchScreenSize);
    this.matchScreenSize();

    if (this.props.mode === 'waterfall') {
      this.refs.header.getDOMNode().addEventListener('transitionend', this.headerTransitionEndHandler.bind(this));
      this.contentScrollHandler_();
    }
  }

  leftTabClick() {
    const tabBar = this.refs.tabBar && this.refs.tabBar.getDOMNode();
    if (!tabBar || !this.state.leftBarActive) {
      return;
    }

    tabBar.scrollLeft -= TAB_SCROLL_PIXELS;
  }

  rightTabClick() {
    const tabBar = this.refs.tabBar && this.refs.tabBar.getDOMNode();
    if (!tabBar || !this.state.rightBarActive) {
      return;
    }

    tabBar.scrollLeft += TAB_SCROLL_PIXELS;
    console.log('right', tabBar.scrollLeft);
  }

  tabScrollHandler() {
    const tabBar = this.refs.tabBar && this.refs.tabBar.getDOMNode();
    if (!tabBar) {
      return;
    }

    let targetState = {};

    if (tabBar.scrollLeft > 0) {
      targetState.leftBarActive = true;
    } else {
      targetState.leftBarActive = false;
    }

    if (tabBar.scrollLeft < tabBar.scrollWidth - tabBar.offsetWidth) {
      targetState.rightBarActive = true;
    } else {
      targetState.rightBarActive = false;
    }

    this.setState(targetState);
  }

  headerTransitionEndHandler() {
    this.setState({
      isAnimating: false,
    });
  }

  headerClickHandler() {
    if (!!this.state.isCompact) {
      this.setState({
        isCompact: false,
        isAnimating: true,
      });
    }
  }

  contentScrollHandler_() {
    if (this.state.isAnimating) {
      return;
    }

    let contentNode = this.refs.content.getDOMNode();
    if (contentNode.scrollTop > 0 && !this.state.isCompact) {
      this.setState({
        isCompact: true,
        isAnimating: true,
        waterfallCastingShadow: true,
      });
    } else if (contentNode.scrollTop <= 0 && this.state.isCompact) {
      this.setState({
        waterfallCastingShadow: false,
        isCompact: false,
        isAnimating: true,
      });
    }
  }

  produceTab() {
    if (!this.props.tabBar) {
      return;
    }
    const tabObject = this.props.tabBar;
    let isActiveClass;
    let isRipple;
    let tabs = Object.keys(tabObject).map((key, index) => {
      isActiveClass = (key === this.state.defaultTab) ? IS_ACTIVE : '';
      isRipple = !!this.props.ripple ? <Ripple /> : null;
      return (<a key={index} href="#scroll-tab-1" className={'mdl-layout__tab ' + isActiveClass} onClick={this.tabOnClick.bind(this, key)}>{tabObject[key].content} {isRipple}</a>);
    }, this);

    return tabs;
  }

  drawerToggleHandler_() {
    if (this.state.drawOpen) {
      this.setState({
        drawOpen: false,
      });
    } else if (!this.state.drawOpen) {
      this.setState({
        drawOpen: true,
      });
    }
  }

  matchScreenSize() {
    if (this.screenQuery.matches) {
      this.setState({
        smallScreen: true,
      });
    } else {
      this.setState({
        smallScreen: false,
        drawOpen: false,
      });
    }
  }

  tabOnClick(key) {
    this.setState({
      defaultTab: key,
    })
  }
};

NavigationLayout.defaultProps = {
   mode: 'standard',
};

export default NavigationLayout;
