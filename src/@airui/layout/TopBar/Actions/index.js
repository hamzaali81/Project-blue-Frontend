import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Dropdown } from 'antd'
import List2 from '@kit/widgets/Lists/2'
import styles from './style.module.scss'

const Actions = () => {
  const menu = (
    <React.Fragment>
      <div className="card air__utils__shadow width-350 border-0">
        <div className="card-body p-0">
          <List2 />
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.dropdown}>
        <i className={`${styles.icon} fe fe-menu`} />
        <span className="d-none d-xl-inline">
          <FormattedMessage id="topBar.actions" />
        </span>
      </div>
    </Dropdown>
  )
}

export default Actions
