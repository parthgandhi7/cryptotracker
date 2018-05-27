import { Component } from 'react'
import { Row, Col, Spin, Icon } from 'antd'
import App from '../App'
// import { UserAuth } from '../../libs';
import Router from 'next/router';
// import { Authenticator } from 'mirkwood';
import { get } from 'lodash';

const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default (ComposedComponent, title) => (
  class WithAuthLayout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    // static async getInitialProps({req}) {
    //   let obj = {
    //     authenticated: false
    //   };
    //
    //   if (process.browser) {
    //     // server session takes some time to get empty
    //     // if queried immediately (without timeout) then
    //     // it says that the user is logged and he is again redirected to users
    //     // page which should nit happen
    //     await setTimeout(() => {
    //        UserAuth.queryMe().then((res) => {
    //         obj.authenticated = true;
    //       }).catch((err) => {
    //         console.error("errr: ", err);
    //       })
    //     }, 600)
    //   } else {
    //     // let session = Authenticator.session(req);
    //     let session = req.session;
    //     if (session && session.auth) {
    //       obj.authenticated = true;
    //     }
    //   }
    //
    //   return obj;
    // }

    // componentDidMount() {
    //   console.log('props asd', this.props);
    //   let pathname = get(this.props, 'url.pathname');
    //   if (this.props.authenticated === true) {
    //     if (pathname === '/paymentinvoices' || pathname == '/paymentprocess' || pathname == '/paymentresult') {
    //       this.setState({
    //         loading: false
    //       })
    //     } else {
    //       Router.push('/index');
    //     }
    //   } else {
    //     this.setState({
    //       loading: false
    //     })
    //   }
    // }

    render() {
      // if (this.state.loading) {
      //   return (
      //     <App>
      //       <div className="app-loader flex--row flex--align-items-center flex--content-center">
      //         <Spin indicator={loadingIcon} size={'large'}/>
      //       </div>
      //       <style jsx>{`
      //         .app-loader {
      //           position: absolute;
      //           top: 0;
      //           bottom: 0;
      //           left: 0;
      //           right: 0;
      //           background-color: #FFF;
      //         }
      //       `}
      //       </style>
      //     </App>
      //   );
      // }
      return (
        <App>
          <div className="absoluted-window flex--column flex--align-items-center flex--content-center">
            <div className="container pad--5 pad--t-8 pad--b-8">
              <Row>
                {/* <Col span={24} className="flex--row flex--align-items-center flex--content-center">
                  <div className="logo pad--t-4 pad--b-4">
                    <img src={'/static/img/logo.png'} alt="Actonate" />
                  </div>
                </Col> */}
                <Col span={24}>
                  <div className="pad--t-4 flex--column flex--align-items-center flex--content-center">
                    <h4 className="text--uppercase font--weight-500 pad--b-5">{title}</h4>
                    <ComposedComponent {...this.props} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <style jsx>{`
            .absoluted-window {
              background-color: #F3F3F3;
            }
            .container {
              max-width: 360px;
              width: 100%;
              background-color: #FFF;
              box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
            }
            .logo img {
              width: auto;
              height: 64px;
              max-width: 100%;
            }
            .container h4 {
              color: #989898;
            }
            @media screen and (max-width: 768px) {
              .absoluted-window {
                background-color: #FFF;
              }
              .container {
                box-shadow: none;
              }
            }
          `}</style>
        </App>
      )
    }
  }
)
