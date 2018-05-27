import { Component } from 'react';
import { Row, Col, Spin, Icon } from 'antd'
import App from '../App'
// import Sidebar from './Sidebar'
import Header from './Header'
// import { UserAuth } from '../../libs/';
import Router from 'next/router';
import { get, cloneDeep } from 'lodash';
const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default (Page, title, breadcrumbs) => (
  class WithLayout extends Component {
    state = {
      sidebarCollapsed: false,
      loading: true
    }

    toggleCallback = () => {
      this.setState({
        sidebarCollapsed: !this.state.sidebarCollapsed
      })
    }

    componentDidMount() {
      console.log("componentDidMount");
      this.setState({
        loading: false
      })
    }

    render() {
      console.log("loading: ", this.state.loading)
      if (this.state.loading) {
        return (
          <App>
            <div className="app-loader flex--row flex--align-items-center flex--content-center">
              <Spin indicator={loadingIcon} size={'large'}/>
            </div>
            <style jsx>{`
              .app-loader {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #FFF;
              }
            `}
            </style>
          </App>
        );
      }

      return (
        <App>
          <div>
            {/* <Sidebar collapsed={this.state.sidebarCollapsed} callback={this.toggleCallback} /> */}
            <div>
              <Header />
              <div className={this.state.sidebarCollapsed ? 'content-container pad--6 collapsed' : 'content-container pad--6'}>
                <Page {...this.props} />
              </div>
            </div>
          </div>
          <style jsx>{`
            .content-container {
              margin-top: 64px;
              // margin-left: 202px;
              transition: all 0.2s;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
            }
            .content-container.collapsed {
              margin-left: 66px;
            }
            @media screen and (max-width: 768px) {
              .content-container, .content-container.collapsed {
                padding: 16px;
                margin-left: 0;
              }
            }
          `}</style>
        </App>
      )
    }
  }
)
