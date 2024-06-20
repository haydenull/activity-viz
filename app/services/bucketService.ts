import type { Bucket } from '@/models/bucket'

import api from './api'

const bucketService = {
  getBucketList: async (): Promise<Bucket[]> => {
    const bucketMap = (await api.get('0/buckets').json()) as Record<string, Bucket>
    return Object.values(bucketMap)
  },
}

export default bucketService
