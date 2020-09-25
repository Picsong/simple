import React from 'react';
import { Link, withRouter } from 'ice';
import { Nav } from '@alifd/next';
import { IMenuItem, headerMenuConfig } from '../../menuConfig';

const { SubNav } = Nav;
const NavItem = Nav.Item;

function getNavMenuItems(menusData: IMenuItem[], initIndex?: number | string) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter((item) => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`);
    });
}

function getSubMenuOrItem(item: IMenuItem, index?: number | string) {
  if (item.children && item.children.some((child) => child.name)) {
    const childrenItems = getNavMenuItems(item.children, index);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={index} icon={item.icon} label={item.name}>
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );

  return navItem;
}

const Navigation = (props) => {
  const { location } = props;
  const { pathname } = location;

  return (
    <Nav
      embeddable
      type="primary"
      activeDirection="right"
      openMode="single"
      direction="hoz"
      triggerType="hover"
      hasArrow={false}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
    >
      {getNavMenuItems(headerMenuConfig, 'goomay')}
    </Nav>
  );
};

const HeadNav = withRouter(Navigation);

export default HeadNav;
