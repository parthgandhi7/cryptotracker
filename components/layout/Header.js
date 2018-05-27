import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    console.log("render");
    return (
      <div style={{background: '#5a5ae8', height:50, boxShadow: '1px 2px #ddddf4' }}>
        <h2 style={{padding: 10, marginLeft: 100}}> <Icon type="bank" />  Crypto Tracker </h2>
      </div>
    );
  }
}

export default Header;
