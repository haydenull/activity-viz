import { createQueryKeyStore } from '@lukemorales/query-key-factory'

import bucketService from './bucketService'
import eventService from './eventService'

export const queries = createQueryKeyStore({
  buckets: {
    getBucketList: {
      queryKey: ['buckets'],
      queryFn: bucketService.getBucketList,
    },
  },
  events: {
    getTodayEvents: {
      queryKey: ['events'],
      queryFn: eventService.getTodayEvents,
    },
  },
})
