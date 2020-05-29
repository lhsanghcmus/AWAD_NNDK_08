import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Template from '../../common/presentational/Template.Modal'
import Select from '../../common/container/Select.Bank'
import Input from '../../common/presentational/Input'
import Button from '../../common/presentational/Button.Loading'
import { fetchReceiversData } from '../../../actions/receivers'
import api from '../../../api/api'

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`
const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 36px;
`
const Text = styled.span`
  font-family: OpenSans-Regular;
  font-size: 12px;
  color: #fff;
  margin-bottom: 24px;
`
class AddReceiverModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bankID: '',
      accountID: '',
      nickname: '',
      error: '',
      loading: false,
      //
      accountIDValid: false,
      accountIDLoading: false,
      accountIDError: '',
    }
    this.handleBankID = this.handleBankID.bind(this)
    this.handleAccountID = this.handleAccountID.bind(this)
    this.handleNickname = this.handleNickname.bind(this)
    this.handleValidateAccountID = this.handleValidateAccountID.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBankID(value) {
    this.setState({
      bankID: value,
      error: '',
    })
  }

  handleAccountID(event) {
    this.setState({
      accountID: event.target.value,
      error: '',
      accountIDError: '',
    })
  }

  handleNickname(event) {
    this.setState({
      nickname: event.target.value,
      error: '',
    })
  }

  async handleValidateAccountID() {
    const { bankID, accountID } = this.state
    if (accountID.length !== 16) {
      this.setState({
        accountIDError: 'Invalid value',
      })
      return
    }
    // Create new receiver
    const data = {
      bankID, accountID,
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    this.setState({
      accountIDLoading: true,
      accountIDError: '',
    })
    const res = await api.post('/banks/validate', data, config)
    if (res.error) {
      const { error } = res
      this.setState({
        accountIDError: error,
        accountIDValid: false,
        accountIDLoading: false,
      })
    } else {
      const { valid, accountName } = res
      if (valid) {
        this.setState({
          accountIDValid: true,
          accountIDLoading: false,
          nickname: accountName,
        })
      } else {
        this.setState({
          accountIDValid: false,
          accountIDLoading: false,
        })
      }
    }
  }

  async handleSubmit() {
    const {
      bankID,
      accountID,
      nickname,
      accountIDValid,
    } = this.state
    const {
      onClose,
      onRefreshReceiversData,
    } = this.props
    if (!bankID || !accountID || !nickname) {
      this.setState({
        error: 'Required field',
      })
      return
    }
    if (!accountIDValid) {
      this.setState({
        accountIDError: 'Invalid value',
      })
      return
    }
    // Validate account ID
    const data = {
      bankID, accountID, nickname,
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    this.setState({
      loading: true,
      error: '',
      accountIDError: '',
    })
    const res = await api.post('/receivers/create', data, config)
    if (res.error) {
      const { error } = res
      this.setState({
        error,
        loading: false,
      })
    } else {
      this.setState({
        error: '',
        loading: false,
      })
      onClose()
      onRefreshReceiversData()
    }
  }

  render() {
    const {
      bankID,
      accountID,
      nickname,
      error,
      loading,
      accountIDValid,
      accountIDLoading,
      accountIDError,
    } = this.state
    const {
      show,
      onClose,
      //
      bankLoading,
    } = this.props
    return (
      <Template
        show={show}
        name="Add receiver"
        onClose={onClose}
      >
        <Text>Enter the infomation for your new contact</Text>
        <InputWrapper>
          <Select
            error={error}
            value={bankID}
            onChange={this.handleBankID}
            disabled={loading}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            label="Card number"
            placeholder="Enter the receiver's card number"
            value={accountID}
            onChange={this.handleAccountID}
            disabled={loading || bankLoading || bankID === ''}
            error={error || accountIDError}
            loading={accountIDLoading}
            onBlur={this.handleValidateAccountID}
          />
        </InputWrapper>
        <Input
          label="Nickname"
          placeholder="Enter the receiver's nickname"
          value={nickname}
          error={error}
          onChange={this.handleNickname}
          disabled={loading || bankLoading || !accountIDValid}
        />
        <ButtonWrapper>
          <Button
            name="Create new receiver"
            fluid
            onClick={this.handleSubmit}
            loading={loading}
          />
        </ButtonWrapper>
      </Template>
    )
  }
}

AddReceiverModal.defaultProps = {
  show: true,
  onClose: (f) => f,
  //
  bankLoading: false,
  onRefreshReceiversData: (f) => f,
}
AddReceiverModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  //
  bankLoading: PropTypes.bool,
  onRefreshReceiversData: PropTypes.func,
}
const mapStateToProps = (state) => ({
  bankLoading: state.banks.loading,
})
const mapDispatchToProps = (dispatch) => ({
  onRefreshReceiversData: () => dispatch(fetchReceiversData()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddReceiverModal)
