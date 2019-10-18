import request from '@/fetch'

const chartApi = {
    getPieChart: data => {
        return request({
            url: '/web/getPieChart',
            method: 'post',
            data
        })
    },
    getLineChart: data => {
        return request({
            url: '/web/getLineChart',
            method: 'post',
            data
        })
    }
}

export default chartApi
