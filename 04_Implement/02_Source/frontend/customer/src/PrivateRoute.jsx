/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './utils/utils'

const PrivateRoute = ({ component: Component, theme, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() ? (
				<Component theme={theme} {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { referer: props.location },
					}}
				/>
			)
		}
	/>
)
export default PrivateRoute
