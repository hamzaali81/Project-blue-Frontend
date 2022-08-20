import React from 'react'
import { injectIntl } from 'react-intl'
import { Dropdown } from 'antd'
import PerfectScrollbar from 'react-perfect-scrollbar'
import List1 from '@kit/widgets/Lists/1'
import styles from './style.module.scss'

const Search = ({ intl: { formatMessage } }) => {
  const menu = (
    <React.Fragment>
      <div className="card air__utils__shadow width-300">
        <div className="card-body pt-3 pb-3 pl-3 pr-1 height-400">
          <PerfectScrollbar>
            <List1 />
          </PerfectScrollbar>
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
      <div className={styles.searchContainer}>
        <i className={`${styles.searchIcon} fe fe-search`} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder={formatMessage({ id: 'topBar.typeToSearch' })}
        />
      </div>
    </Dropdown>
  )
}

export default injectIntl(Search)
