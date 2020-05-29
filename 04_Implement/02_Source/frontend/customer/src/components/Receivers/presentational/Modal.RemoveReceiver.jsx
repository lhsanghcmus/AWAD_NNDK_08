import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DeleteButton from '../../common/presentational/Button.Loading'
import CancelButton from '../../common/presentational/Button'
import Template from '../../common/presentational/Template.Modal'
import { fetchReceiversData } from '../../../actions/receivers'
import api from '../../../api/api'

const Text = styled.span`
  font-family: OpenSans-Regular;
  font-size: 12px;
  color: #fff;
  line-height: 16px;
`
const Error = styled(Text)`
  color: ${(props) => props.theme.yellow};
  margin: 14px 0;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 54px;
`
const DeleteWrapper = styled.div`
  width: 100%;
  margin-right: 10px;
`
const CancelWrapper = styled.div`
  width: 100%;
  margin-left: 10px;
`

const RemoveReceiverModal = ({
  id,
  show,
  onClose,
  //
  onRefreshReceiversData,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setError('')
    setLoading(true)
    const data = {
      id,
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    const res = await api.delete('/receivers/remove', data, config)
    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setLoading(false)
      onClose()
      onRefreshReceiversData()
    }
  }
  return (
    <Template
      show={show}
      name="Alert"
      onClose={onClose}
    >
      <Text>
        You are about to remove a contact!
        <br />
        {' '}
        This action cannot be restored!
      </Text>
      {
        error && <Error>{error}</Error>
      }
      <ButtonWrapper>
        <DeleteWrapper>
          <DeleteButton
            name="Delete"
            fluid
            onClick={handleDelete}
            loading={loading}
          />
        </DeleteWrapper>
        <CancelWrapper>
          <CancelButton
            name="Cancel"
            secondary
            fluid
            onClick={onClose}
          />
        </CancelWrapper>
      </ButtonWrapper>
    </Template>
  )
}
RemoveReceiverModal.defaultProps = {
  id: '',
  show: true,
  onClose: (f) => f,
  onRefreshReceiversData: (f) => f,
}
RemoveReceiverModal.propTypes = {
  id: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onRefreshReceiversData: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => ({
  onRefreshReceiversData: () => dispatch(fetchReceiversData()),
})
export default connect(
  null,
  mapDispatchToProps,
)(RemoveReceiverModal)
