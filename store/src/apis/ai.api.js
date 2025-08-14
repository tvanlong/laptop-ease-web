import http from '@/utils/http'

const aiApi = {
  suggest: (params) => http.get('/api/ai-search', { params }),
  getHistory: () => http.get('/api/ai-search/history')
}

export default aiApi
