import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import Header from './Table.Header.Transfer'
import Item from './Table.Item.Transfer'
import Loading from '../../common/presentational/Loading.Table'
import { TransactionStatus } from '../../../constants/constants'
import {
  invalidateHistoryData,
  fecthHistoryDataIfNeeded,
} from '../../../actions/history'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
const Content = styled.div`
  width: 100%;
  height: 590px;
  position: relative;
`
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desc: null,
      filter: '',
    }
    this.ref = createRef()
    this.handleDesc = this.handleDesc.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidMount() {
    const {
      loading,
      // onInvalidateData,
      onFetchData,
    } = this.props
    if (!loading) {
      this.ref.current.scrollArea.scrollTop()
    }
    // onInvalidateData()
    onFetchData('transfer')
  }

  componentDidUpdate() {
    const { loading } = this.props
    if (!loading) {
      this.ref.current.scrollArea.scrollTop()
    }
  }

  handleDesc() {
    this.setState((prevState) => ({
      desc: prevState.desc === null ? false : !prevState.desc,
    }))
  }

  handleFilter(value) {
    this.setState({
      filter: value,
    })
  }

  render() {
    const { desc, filter } = this.state
    const {
      data,
      loading,
    } = this.props
    let sortedData = data
    if (filter) {
      sortedData = sortedData.filter((o) => o.status === filter)
    }
    if (desc !== null) {
      sortedData = sortedData.sort((a, b) => (desc ? a.date - b.date : b.date - a.date))
    }
    return (
      <Wrapper>
        <Header
          desc={desc}
          onFilter={this.handleFilter}
          onSort={this.handleDesc}
        />
        <Content>
          {
            loading ? <Loading />
              : (
                <ScrollArea
                  speed={0.5}
                  horizontal={false}
                  style={{ maxHeight: '590px' }}
                  verticalScrollbarStyle={{ width: '5px', backgroundColor: '#7C7F87', borderRadius: '10px' }}
                  verticalContainerStyle={{
                    width: '5px', backgroundImage: 'linear-gradient(180deg, #26292E 0%, #16181C 100%)', borderRadius: '10px', right: '0px',
                  }}
                  smoothScrolling
                  ref={this.ref}
                >
                  {
                    sortedData.map((item, index) => (
                      <Item
                        key={item.senderID}
                        index={index + 1}
                        accountID={item.receiverID}
                        accountName={item.receiverName}
                        amount={item.amount}
                        bankName={item.bankName}
                        status={item.status}
                        date={item.date}
                        lastItem={index === data.length - 1}
                      />
                    ))
                  }
                </ScrollArea>
              )
          }
        </Content>
      </Wrapper>
    )
  }
}

Table.defaultProps = {
  data: [],
  loading: false,
  // onInvalidateDate: (f) => f,
  onFetchData: (f) => f,
}
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    borrowerID: PropTypes.string,
    borrowerName: PropTypes.string,
    status: PropTypes.oneOf([
      TransactionStatus.SUCCESS,
      TransactionStatus.FAILED,
      TransactionStatus.REFUND,
    ]),
    amount: PropTypes.number,
  })),
  loading: PropTypes.bool,
  // onInvalidateDate: PropTypes.func,
  onFetchData: PropTypes.func,
}
const mapStateToProps = (state) => ({
  loading: state.history.transfer.loading,
  data: state.history.transfer.data,
})
const mapDispatchToProps = (dispatch) => ({
  onInvalidateDate: (category) => dispatch(invalidateHistoryData(category)),
  onFetchData: (category) => dispatch(fecthHistoryDataIfNeeded(category)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table)
