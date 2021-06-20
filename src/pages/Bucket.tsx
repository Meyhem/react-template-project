import _ from 'lodash'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Layout } from '../components/Layout'
import { SearchActions } from '../redux/search'
import { selectLogs } from '../redux/search/selectors'
import { RootState } from '../redux/types'

type BucketProps = {}

export const BucketPage: FC<BucketProps> = ({}) => {
  const { bucket } = useParams<{ bucket: string }>()
  const d = useDispatch()

  // const filters = useSelector((state: RootState) => selectFilter(state, bucket))
  const logs = useSelector((state: RootState) => selectLogs(state, bucket))

  useEffect(() => {
    d(SearchActions.load({ bucket: bucket }))
  }, [bucket, d])

  return (
    <Layout heading={bucket}>
      {_.map(logs, (l, i) => (
        <div key={i}>{l.message}</div>
      ))}
    </Layout>
  )
}
