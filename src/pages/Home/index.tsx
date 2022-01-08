import React, { useEffect } from 'react'
import { useApi } from '../../hooks/api'

export const Home: React.VFC = () => {
	const { getPatients } = useApi()
	useEffect(() => {
		getPatients()
	}, [getPatients])

	return (
		<div>hello home</div>
	)
}
