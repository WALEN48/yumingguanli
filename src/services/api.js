import axios from 'axios'
import { message } from 'antd'

// 鍒涘缓 axios 瀹炰緥
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 璇锋眰鎷︽埅鍣?api.interceptors.request.use(
  (config) => {
    // 鍙互鍦ㄨ繖閲屾坊鍔?loading 鐘舵€?    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 鍝嶅簲鎷︽埅鍣?api.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code !== 200) {
      message.error(data.message || '璇锋眰澶辫触')
      return Promise.reject(new Error(data.message))
    }
    return data.data
  },
  (error) => {
    const errorMsg = error.response?.data?.message || error.message || '缃戠粶閿欒'
    message.error(errorMsg)
    return Promise.reject(error)
  }
)

// 妯℃嫙鏁版嵁 - 寰皬 iOS 瀹㈡湇鏀粯閾炬帴
let iosPaymentLinks = [
  { id: 1, url: 'https://pay.example.com/ios/service1', entity: '骞垮窞淇¤穬缃戠粶鎶€鏈湁闄愬叕鍙?, status: 1, remark: 'iOS鏀粯涓婚摼鎺?, editor: '寮犱笁', editTime: '2026-04-15 10:30:00' },
  { id: 2, url: 'https://pay.example.com/ios/service2', entity: '閮戝窞鍗氬畨缃戠粶绉戞妧鏈夐檺鍏徃', status: 1, remark: '澶囩敤鏀粯閾炬帴', editor: '鏉庡洓', editTime: '2026-04-14 16:45:00' },
  { id: 3, url: 'https://pay.example.com/ios/service3', entity: '骞垮窞澶╃旱淇℃伅鎶€鏈湁闄愬叕鍙?, status: 1, remark: '', editor: '鐜嬩簲', editTime: '2026-04-13 09:20:00' },
]

// 妯℃嫙鏁版嵁 - 鍗忚閾炬帴
let agreementLinks = [
  { id: 1, url: 'https://agreement.example.com/terms1', entity: '閮戝窞淇¤穬缃戠粶绉戞妧鏈夐檺鍏徃', status: 1, editor: '寮犱笁', editTime: '2026-04-15 11:00:00' },
  { id: 2, url: 'https://agreement.example.com/privacy', entity: '閮戝窞澶╃旱缃戠粶绉戞妧鏈夐檺鍏徃', status: 1, editor: '鏉庡洓', editTime: '2026-04-14 14:30:00' },
]

// 妯℃嫙鏁版嵁 - 鏀粯閾炬帴绠＄悊
let paymentLinkMappings = [
  { id: 1, game: '闈掓湪', channel: '[1]娓犻亾鍚嶇О', entity: '閮戝窞淇¤穬缃戠粶绉戞妧鏈夐檺鍏徃', link: 'https://pay.example.com/ios/service1', editor: '寮犱笁', editTime: '2026-04-15 10:30:00' },
  { id: 2, game: '瀹堝崼灞辨捣', channel: '[2]娓犻亾鍚嶇О', entity: '閮戝窞澶╃旱缃戠粶绉戞妧鏈夐檺鍏徃', link: 'https://pay.example.com/ios/service2', editor: '鏉庡洓', editTime: '2026-04-14 16:45:00' },
]

// 妯℃嫙 API 鎺ュ彛
export const iosPaymentApi = {
  // 鑾峰彇鍒楄〃
  getList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...iosPaymentLinks]
        if (params.entity) {
          result = result.filter(item => item.entity.includes(params.entity))
        }
        if (params.status !== undefined && params.status !== '') {
          result = result.filter(item => item.status === parseInt(params.status))
        }
        resolve({
          list: result,
          total: result.length,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        })
      }, 300)
    })
  },

  // 鏂板
  create: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          ...data,
          id: Date.now(),
          editor: '褰撳墠鐢ㄦ埛',
          editTime: new Date().toLocaleString('zh-CN')
        }
        iosPaymentLinks.push(newItem)
        resolve(newItem)
      }, 300)
    })
  },

  // 缂栬緫
  update: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = iosPaymentLinks.findIndex(item => item.id === id)
        if (index > -1) {
          iosPaymentLinks[index] = {
            ...iosPaymentLinks[index],
            ...data,
            editor: '褰撳墠鐢ㄦ埛',
            editTime: new Date().toLocaleString('zh-CN')
          }
          resolve(iosPaymentLinks[index])
        }
      }, 300)
    })
  },

// 鑾峰彇涓讳綋閫夐」
  getEntityOptions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ENTITY_OPTIONS)
      }, 200)
    })
  }
}

// 涓讳綋閫夐」
const ENTITY_OPTIONS = [
  { label: '閮戝窞淇¤穬缃戠粶绉戞妧鏈夐檺鍏徃', value: '閮戝窞淇¤穬缃戠粶绉戞妧鏈夐檺鍏徃' },
  { label: '閮戝窞澶╃旱缃戠粶绉戞妧鏈夐檺鍏徃', value: '閮戝窞澶╃旱缃戠粶绉戞妧鏈夐檺鍏徃' },
  { label: '骞垮窞澶╃旱淇℃伅鎶€鏈湁闄愬叕鍙?, value: '骞垮窞澶╃旱淇℃伅鎶€鏈湁闄愬叕鍙? },
]

export const agreementApi = {
  // 鑾峰彇鍒楄〃
  getList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...agreementLinks]
        if (params.entity) {
          result = result.filter(item => item.entity.includes(params.entity))
        }
        if (params.status !== undefined && params.status !== '') {
          result = result.filter(item => item.status === parseInt(params.status))
        }
        resolve({
          list: result,
          total: result.length,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        })
      }, 300)
    })
  },

  // 鏂板
  create: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          ...data,
          id: Date.now(),
          editor: '褰撳墠鐢ㄦ埛',
          editTime: new Date().toLocaleString('zh-CN')
        }
        agreementLinks.push(newItem)
        resolve(newItem)
      }, 300)
    })
  },

  // 缂栬緫
  update: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = agreementLinks.findIndex(item => item.id === id)
        if (index > -1) {
          agreementLinks[index] = {
            ...agreementLinks[index],
            ...data,
            editor: '褰撳墠鐢ㄦ埛',
            editTime: new Date().toLocaleString('zh-CN')
          }
          resolve(agreementLinks[index])
        }
      }, 300)
    })
  },

  // 鑾峰彇涓讳綋閫夐」
  getEntityOptions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ENTITY_OPTIONS)
      }, 200)
    })
  },

  // 鏇存柊澶囨敞
  updateRemark: (id, remark) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = iosPaymentLinks.findIndex(item => item.id === id)
        if (index > -1) {
          iosPaymentLinks[index] = {
            ...iosPaymentLinks[index],
            remark,
            editor: '褰撳墠鐢ㄦ埛',
            editTime: new Date().toLocaleString('zh-CN')
          }
          resolve(iosPaymentLinks[index])
        }
      }, 300)
    })
  }
}

export const paymentLinkManageApi = {
  // 鑾峰彇鍒楄〃
  getList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...paymentLinkMappings]
        if (params.game) {
          result = result.filter(item => item.game.includes(params.game))
        }
        if (params.channel) {
          result = result.filter(item => item.channel.includes(params.channel))
        }
        if (params.entity) {
          result = result.filter(item => item.entity.includes(params.entity))
        }
        resolve({
          list: result,
          total: result.length,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        })
      }, 300)
    })
  },

  // 缂栬緫
  update: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = paymentLinkMappings.findIndex(item => item.id === id)
        if (index > -1) {
          paymentLinkMappings[index] = {
            ...paymentLinkMappings[index],
            ...data,
            editor: '褰撳墠鐢ㄦ埛',
            editTime: new Date().toLocaleString('zh-CN')
          }
          resolve(paymentLinkMappings[index])
        }
      }, 300)
    })
  },

  // 鑾峰彇娓告垙閫夐」
  getGameOptions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: '闈掓湪', value: '闈掓湪' },
          { label: '瀹堝崼灞辨捣', value: '瀹堝崼灞辨捣' },
          { label: '浠ｅ彿F', value: '浠ｅ彿F' },
        ])
      }, 200)
    })
  },

  // 鑾峰彇娓犻亾閫夐」
  getChannelOptions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: '[1]娓犻亾鍚嶇О', value: '[1]娓犻亾鍚嶇О' },
          { label: '[2]娓犻亾鍚嶇О', value: '[2]娓犻亾鍚嶇О' },
        ])
      }, 200)
    })
  },

  // 鑾峰彇涓讳綋閫夐」
  getEntityOptions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ENTITY_OPTIONS)
      }, 200)
    })
  },

  // 鏍规嵁涓讳綋鑾峰彇閾炬帴閫夐」
  getLinkOptionsByEntity: (entity) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const links = iosPaymentLinks
          .filter(item => item.entity === entity && item.status === 1)
          .map(item => ({ label: item.url, value: item.url }))
        resolve(links)
      }, 200)
    })
  }
}

export default api
