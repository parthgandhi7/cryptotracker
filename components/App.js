import antdStyles from 'antd/dist/antd.less';
// import styles from '../styles/index.less';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import Head from 'next/head';
import { AppName } from '../config/globals';

// UserAuth.init(client);
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <Head>
            <title>{AppName}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <style dangerouslySetInnerHTML={{ __html: antdStyles}} />
          {/* <style dangerouslySetInnerHTML={{ __html: styles}} /> */}
          {children}
        </div>
      </LocaleProvider>
    )
  }
}
