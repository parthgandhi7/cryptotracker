import { Table, Icon, Input, Button, Select } from 'antd';
import WithLayout from '../components/layout/withLayout';
const API_URL = 'http://localhost:3000/';
import moment from 'moment';
const currencyCodes =  require('../config/currencyCodes.json');
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: {},
      searchText: '',
      loading: true
    };
    this.mainData = [];
    this.selectedCurrency = 'INR';
  }

  fetchData = () => {
    this.setState({loading: true})
    fetch(`${API_URL}coins`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currencyCode: this.selectedCurrency
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Logged in response:", responseJson);
      this.mainData = responseJson.data;
      this.setState({data: responseJson.data, loading: false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onInputChange = (e) => {
    console.log("onInputChange:", e.target.value);
    // const { searchText } = this.state;
    let searchText = e.target.value;
    let data = this.state.data;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      searchText: e.target.value,
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.mainData.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record
        };
      }).filter(record => !!record),
    });
  }

  handleChange = (value) => {
    this.selectedCurrency = value;
    this.fetchData();
  }

  render() {
    const dataSource = this.state.data;
    let self = this;
    const columns = [{
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      sorter: (a, b) => parseInt(a.rank) - parseInt(b.rank)
    }, {
      title: 'Name (code)',
      dataIndex: 'name',
      key: 'name',
      type: 'string',
      sorter: (a, b) => a.name.length - b.name.length
    }, {
      title: `Market Cap (${this.selectedCurrency})`,
      dataIndex: 'inr_market_cap',
      key: 'inr_market_cap',
      sorter: (a, b) => parseFloat(a.inr_market_cap) - parseFloat(b.inr_market_cap)
    }, {
      title: `Price (${this.selectedCurrency})`,
      dataIndex: 'inr_price',
      key: 'inr_price',
      sorter: (a, b) => parseFloat(a.inr_price) - parseFloat(b.inr_price)
    }, {
      title: 'Price (USD)',
      dataIndex: 'usd_price',
      key: 'usd_price',
      sorter: (a, b) => parseFloat(a.usd_price) - parseFloat(b.usd_price)
    }, {
      title: 'Last Updated',
      dataIndex: 'last_updated',
      key: 'last_updated',
      render: (text, record) => (
        <span>
          {moment(text).format('HH:mm:ss')}
        </span>
      )
    }
  ];

    columns.forEach((column) => {
      if (column.type === 'string') {
        column.filterIcon =
          <Icon type="search" style={{ color: this.state[column.key + this.FILTERED] ? '#108ee9' : '#aaa' }} />
        column.filterDropdown = (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search name"
              value={self.state.searchText}
              onChange={self.onInputChange}
              fieldname={column.key}
              id={column.key}
            />
          </div>
        );
        column.filterDropdownVisible = self.state[column.key + self.DROP_DOWN_VISIBLE];
        column.onFilterDropdownVisibleChange = (visible) => {
          this.setState({
            [column.key + self.DROP_DOWN_VISIBLE]: visible,
          }, () => {
            this.searchInput && this.searchInput.focus()
          });
        }
      }
    })

    let options = currencyCodes.map((code) => {
      return <Option key={code} value={code}>{code}</Option>
    })
    return (
      <div>
        <div>
          <Select
            showSearch
            style={{ width: 200,marginLeft: 20 }}
            defaultValue="INR"
            onChange={this.handleChange}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {options}
          </Select>
          <Button icon='reload' style={{ border: 0, fontSize: 24, float: 'right',
            marginTop: '-10px', paddingRight: 20}} onClick={this.fetchData}/>
        </div>
        <Table loading={this.state.loading} style={{ padding: '10px 20px 0px 20px'}} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default WithLayout(Index);
