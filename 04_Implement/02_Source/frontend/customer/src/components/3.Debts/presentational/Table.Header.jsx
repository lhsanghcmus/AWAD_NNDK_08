import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import Filter from './Filter.Status'

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid #000000;
  background-color: ${(props) => props.theme.blackDark};
`
const Text = styled.span`
  font-family: OpenSans-SemiBold;
  font-size: 15px;
  color: #fff;
`
const TableHeader = ({
  onFilter,
}) => (
  <Wrapper>
    <Row>
      <Col md={1} />
      <Col md={3}><Text>Debt account:</Text></Col>
      <Col md={3}><Text>Amount</Text></Col>
      <Col md={3}>
        <Filter
          name="Status"
          onChange={onFilter}
        />
      </Col>
      <Col md={2}><Text>Actions</Text></Col>
    </Row>
  </Wrapper>
)
TableHeader.defaultProps = {
  onFilter: (f) => f,
}
TableHeader.propTypes = {
  onFilter: PropTypes.func,
}

export default TableHeader
