import React, { useState, useEffect } from 'react'
import {
  Spin,
  Alert,
  Table,
  Select,
  Tabs,
  Radio,
  Input,
  Form,
  Menu,
  Dropdown,
  Tag,
  Affix,
} from 'antd'
import { Helmet } from 'react-helmet'
import TradeChart from './TradeChart'
import getData from './TradeChart/utils'
import styles from './style.module.scss'
import { myOpenOrdersData, marketHistoryData, orderBookBuy, orderBookSell } from './data.json'

const { TabPane } = Tabs

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Action
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Another action
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Something else here
      </a>
    </Menu.Item>
    <div className="dropdown-divider" />
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Separated link
      </a>
    </Menu.Item>
  </Menu>
)

const DashboardCrypto = () => {
  const [myOpenOrdersLoading, setMyOpenOrdersLoading] = useState(false)
  const [myOpenOrdersLoaded, setMyOpenOrdersLoaded] = useState(false)
  const [myOrderHistoryLoading, setMyOrderHistoryLoading] = useState(false)
  const [myOrderHistoryLoaded, setMyOrderHistoryLoaded] = useState(false)

  const [orderType, setOrderType] = useState('buy')
  const [graphData, setGraphData] = useState(null)

  useEffect(() => {
    getData().then(data => {
      setGraphData(data)
    })
  }, [])

  const handleMyOpenOrders = e => {
    e.preventDefault()
    setMyOpenOrdersLoading(true)
    setTimeout(() => {
      setMyOpenOrdersLoading(false)
      setMyOpenOrdersLoaded(true)
    }, 1500)
  }

  const handleMyOrderHistory = e => {
    e.preventDefault()
    setMyOrderHistoryLoading(true)
    setTimeout(() => {
      setMyOrderHistoryLoading(false)
      setMyOrderHistoryLoaded(true)
    }, 1500)
  }

  const toggleOrderType = e => {
    setOrderType(e.target.value)
  }

  const myOrderColumns = [
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Open Date',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: value => (
        <span style={{ color: value === 'SELL' ? '#f75535' : '#00a45b' }}>{value}</span>
      ),
    },
    {
      title: 'Bid/Ask',
      dataIndex: 'bidAsk',
      key: 'bidAsk',
    },
    {
      title: 'Filled',
      dataIndex: 'filled',
      key: 'filled',
    },
    {
      title: 'Units Total',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
    },
    {
      title: 'Actual Rate',
      dataIndex: 'actualRate',
      key: 'actualRate',
    },
    {
      title: 'Est. Total',
      dataIndex: 'estTotal',
      key: 'estTotal',
    },
  ]

  const marketHistoryColumns = [
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'BUY/SELL',
      dataIndex: 'type',
      key: 'type',
      render: value => (
        <span style={{ color: value === 'SELL' ? '#f75535' : '#00a45b' }}>{value}</span>
      ),
    },
    {
      title: 'Bid/Ask',
      dataIndex: 'bidAsk',
      key: 'bidAsk',
    },
    {
      title: 'Units Total',
      dataIndex: 'unitsTotal',
      key: 'unitsTotal',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
  ]

  const ordersSellColumns = [
    {
      title: 'SUM',
      dataIndex: 'sum',
      key: 'sum',
      align: 'right',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      align: 'right',
    },
    {
      title: 'BID',
      dataIndex: 'bid',
      key: 'bid',
      width: 120,
      align: 'right',
      render: value => <span style={{ color: '#00a45b' }}>{value}</span>,
    },
    {
      title: '',
      dataIndex: 'sell',
      key: 'sell',
      width: 60,
      align: 'right',
      render: () => (
        <a href="#" className="utils__link--blue mr-2">
          <strong>SELL</strong>
        </a>
      ),
    },
  ]

  const ordersBuyColumns = [
    {
      title: '',
      dataIndex: 'sell',
      key: 'sell',
      width: 60,
      render: () => (
        <a href="#" className="utils__link--blue ml-2">
          <strong>BUY</strong>
        </a>
      ),
    },
    {
      title: 'ASK',
      dataIndex: 'ask',
      key: 'ask',
      width: 120,
      render: value => <span style={{ color: '#f75535' }}>{value}</span>,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'SUM',
      dataIndex: 'sum',
      key: 'sum',
    },
  ]

  return (
    <div>
      <Helmet title="Dashboard Crypto" />
      <div className="air__utils__heading">
        <h5>Dashboard: Bittrex Crypto Terminal</h5>
      </div>
      <div className={styles.crypto}>
        <div className={styles.listMobile}>
          <div className="cui__utils__heading">
            <strong>Markets</strong>
          </div>
          <Select showSearch size="large" defaultValue="btc" style={{ width: '100%' }}>
            <Select.Option value="btc">
              BTC (Bitcoin)
              <Tag color="blue" className="ml-3">
                11.7%
              </Tag>
            </Select.Option>
            <Select.Option value="xmr">
              XMR (Monero)
              <Tag color="blue" className="ml-3">
                67.5%
              </Tag>
            </Select.Option>
            <Select.Option value="gld">
              GLD (GoldCoin)
              <Tag color="red" className="ml-3">
                -22.9%
              </Tag>
            </Select.Option>
            <Select.Option value="neo">
              NEO (Neo)
              <Tag color="red" className="ml-3">
                -12.3%
              </Tag>
            </Select.Option>
            <Select.Option value="btg">
              BTG (Bitcoin Gold)
              <Tag color="blue" className="ml-3">
                +4.3%
              </Tag>
            </Select.Option>
            <Select.Option value="xrp">
              XRP (Ripple)
              <Tag color="red" className="ml-3">
                -4.2%
              </Tag>
            </Select.Option>
            <Select.Option value="zec">
              ZEC (ZCash)
              <Tag color="red" className="ml-3">
                -1.7%
              </Tag>
            </Select.Option>
            <Select.Option value="neo">
              ZCL (ZClassic)
              <Tag color="red" className="ml-3">
                -2.8%
              </Tag>
            </Select.Option>
          </Select>
        </div>
        <div className={styles.list}>
          <Affix offsetTop={20}>
            <div className={`${styles.listInner} rounded h-100`}>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">RVN</div>
                <div className="text-success font-size-14 align-text-bottom">
                  5.2% <span>↑</span>
                </div>
              </a>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className={`${styles.item} ${styles.itemActive} p-1`}
              >
                <div className="font-size-16 text-uppercase">BTC</div>
                <div className="text-success font-size-14 align-text-bottom">
                  1.4% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">XRP</div>
                <div className="text-danger font-size-14 align-text-bottom">
                  5.2% <span>↓</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">ADA</div>
                <div className="text-success font-size-14 align-text-bottom">
                  6.8% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">BSV</div>
                <div className="text-success font-size-14 align-text-bottom">
                  8.9% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">TUSD</div>
                <div className="text-danger font-size-14 align-text-bottom">
                  5.2% <span>↓</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">MTL</div>
                <div className="text-success font-size-14 align-text-bottom">
                  8.9% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">RVN</div>
                <div className="text-success font-size-14 align-text-bottom">
                  5.2% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">BTC</div>
                <div className="text-success font-size-14 align-text-bottom">
                  1.4% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">XRP</div>
                <div className="text-danger font-size-14 align-text-bottom">
                  5.2% <span>↓</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">ADA</div>
                <div className="text-success font-size-14 align-text-bottom">
                  6.8% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">BSV</div>
                <div className="text-success font-size-14 align-text-bottom">
                  8.9% <span>↑</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">TUSD</div>
                <div className="text-danger font-size-14 align-text-bottom">
                  5.2% <span>↓</span>
                </div>
              </a>
              <a href="#" onClick={e => e.preventDefault()} className={`${styles.item} p-1`}>
                <div className="font-size-16 text-uppercase">MTL</div>
                <div className="text-success font-size-14 align-text-bottom">
                  8.9% <span>↑</span>
                </div>
              </a>
            </div>
          </Affix>
        </div>
        <div className={styles.content}>
          <div className="card bg-white">
            <div className="card-header card-header-flex">
              <Tabs defaultActiveKey="1" className="kit-tabs-bold mr-auto">
                <TabPane tab="MARKET CHART" key="1" />
                <TabPane tab="DEPTH CHART" key="2" />
              </Tabs>
              <div className="d-inline-flex align-items-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    onClick={e => e.preventDefault()}
                    role="button"
                  >
                    30m
                  </a>
                </Dropdown>
              </div>
              <div className="d-inline-flex align-items-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    onClick={e => e.preventDefault()}
                    role="button"
                  >
                    Views
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="card-body">
              <div style={{ height: 400 }}>
                {graphData !== null && <TradeChart type="hybrid" data={graphData} />}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Order Book</h5>
              <div className={styles.order}>
                <div className={styles.orderLeft}>
                  <div className={`${styles.table} kit__utils__table`}>
                    <Table
                      columns={ordersSellColumns}
                      dataSource={orderBookSell}
                      pagination={{ position: 'bottom' }}
                      size="small"
                    />
                  </div>
                </div>
                <div className={styles.orderMiddle}>
                  <div className={styles.form}>
                    <Form layout="vertical">
                      <Form.Item>
                        <Radio.Group
                          onChange={toggleOrderType}
                          value={orderType}
                          style={{ width: '100%' }}
                        >
                          <Radio.Button value="buy" style={{ width: '50%', textAlign: 'center' }}>
                            BUY
                          </Radio.Button>
                          <Radio.Button value="sell" style={{ width: '50%', textAlign: 'center' }}>
                            SELL
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      {orderType === 'buy' && (
                        <div>
                          <span className={styles.formLabel}>ORDER TYPE</span>
                          <Form.Item>
                            <Select defaultValue="limit">
                              <Select.Option value="limit">Limit (Default)</Select.Option>
                              <Select.Option value="conditional">Conditional</Select.Option>
                            </Select>
                          </Form.Item>
                          <span className={styles.formLabel}>QUANTITY (BTC)</span>
                          <Form.Item>
                            <Input defaultValue="0.00000000" />
                          </Form.Item>
                          <span className={styles.formLabel}>BID PRICE</span>
                          <Form.Item>
                            <Input defaultValue="0.00645198" />
                          </Form.Item>
                          <span className={styles.formLabel}>TOTAL</span>
                          <Form.Item>
                            <Input defaultValue="0.00000000" />
                          </Form.Item>
                          <span className={styles.formLabel}>TIME IN FORCE</span>
                          <Form.Item>
                            <Select defaultValue="good">
                              <Select.Option value="good">
                                Good &#39;Til Cancelled (Default)
                              </Select.Option>
                              <Select.Option value="immediate">Immediate or Cancel</Select.Option>
                            </Select>
                          </Form.Item>
                          <div className="btn btn-success" style={{ width: '100%' }}>
                            <strong>BUY BTC</strong>
                          </div>
                          <div className="my-3 text-center">
                            <div>
                              <strong>Available Balance</strong>
                            </div>
                            <div>12.92520000 BTC</div>
                            <div>1450.00 USD</div>
                            <div>
                              <a href="#" className="utils__link--blue utils__link--underlined">
                                <strong>Max Buy</strong>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {orderType === 'sell' && (
                        <div>
                          <span className={styles.formLabel}>ORDER TYPE</span>
                          <Form.Item>
                            <Select defaultValue="limit">
                              <Select.Option value="limit">Limit (Default)</Select.Option>
                              <Select.Option value="conditional">Conditional</Select.Option>
                            </Select>
                          </Form.Item>
                          <span className={styles.formLabel}>QUANTITY (BTC)</span>
                          <Form.Item>
                            <Input defaultValue="0.00000000" />
                          </Form.Item>
                          <span className={styles.formLabel}>ASK PRICE</span>
                          <Form.Item>
                            <Input defaultValue="0.00645198" />
                          </Form.Item>
                          <span className={styles.formLabel}>TOTAL</span>
                          <Form.Item>
                            <Input defaultValue="0.00000000" />
                          </Form.Item>
                          <span className={styles.formLabel}>TIME IN FORCE</span>
                          <Form.Item>
                            <Select defaultValue="good">
                              <Select.Option value="good">
                                Good &#39;Til Cancelled (Default)
                              </Select.Option>
                              <Select.Option value="immediate">Immediate or Cancel</Select.Option>
                            </Select>
                          </Form.Item>
                          <div className="btn btn-danger" style={{ width: '100%' }}>
                            <strong>SELL BTC</strong>
                          </div>
                          <div className="my-3 text-center">
                            <div>
                              <strong>Available Balance</strong>
                            </div>
                            <div>12.92520000 BTC</div>
                            <div>1450.00 USD</div>
                            <div>
                              <a href="#" className="utils__link--blue utils__link--underlined">
                                <strong>Max SELL</strong>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </Form>
                  </div>
                </div>
                <div className={styles.orderRight}>
                  <div className={`${styles.table} kit__utils__table`}>
                    <Table
                      columns={ordersBuyColumns}
                      dataSource={orderBookBuy}
                      pagination={{ position: 'bottom' }}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Market History</h5>
              <div className={`${styles.table} kit__utils__table`}>
                <Table
                  columns={marketHistoryColumns}
                  dataSource={marketHistoryData}
                  pagination={{ position: 'bottom' }}
                  size="small"
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">My Open Orders</h5>
              <div>
                {!myOpenOrdersLoaded && (
                  <a href="#" onClick={handleMyOpenOrders}>
                    <Spin spinning={myOpenOrdersLoading}>
                      <Alert
                        className={styles.warning}
                        message="Click to view open order details"
                        type="info"
                      />
                    </Spin>
                  </a>
                )}
                {myOpenOrdersLoaded && (
                  <div className={`${styles.table} kit__utils__table`}>
                    <Table
                      columns={myOrderColumns}
                      dataSource={myOpenOrdersData}
                      pagination={{ position: 'bottom' }}
                      size="small"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">My Order History</h5>
              <div>
                {!myOrderHistoryLoaded && (
                  <a href="#" onClick={handleMyOrderHistory}>
                    <Spin spinning={myOrderHistoryLoading}>
                      <Alert
                        className={styles.warning}
                        message="Click to view order history details"
                        type="info"
                      />
                    </Spin>
                  </a>
                )}
                {myOrderHistoryLoaded && (
                  <div className={`${styles.table} kit__utils__table`}>
                    <Table
                      columns={myOrderColumns}
                      dataSource={myOpenOrdersData}
                      pagination={{ position: 'bottom' }}
                      size="small"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCrypto
