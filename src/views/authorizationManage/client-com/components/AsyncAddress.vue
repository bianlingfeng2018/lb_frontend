<template>
  <div id="AsyncAddress">
    <el-select
      v-model="provinceCode"
      size="medium"
      :placeholder="'省'"
      filterable
      style="width: 120px"
      @focus="getProvinces"
      @change="changeProvince"
    >
      <el-option
        v-for="item in provinceList"
        :key="item.provinceCode"
        :label="item.provinceName"
        :value="item.provinceCode"
      />
    </el-select>
    <el-select
      v-model="cityCode"
      size="medium"
      :placeholder="'市'"
      filterable
      style="width: 120px"
      @focus="getCities"
      @change="changeCity"
    >
      <el-option
        v-for="item in cityList"
        :key="item.cityCode"
        :label="item.cityName"
        :value="item.cityCode"
      />
    </el-select>
    <el-select
      v-model="areaCode"
      size="medium"
      :placeholder="'区/县'"
      filterable
      style="width: 120px"
      @focus="getAreas"
      @change="changeArea"
    >
      <el-option
        v-for="item in areaList"
        :key="item.areaCode"
        :label="item.areaName"
        :value="item.areaCode"
      />
    </el-select>
  </div>
</template>

<script>
import { getAddressByCodeAndType, getFullAddressByCode } from "@/api/clientCompany"

export default {
  name: 'AsyncAddress',

  components: {},

  model: {
    prop: 'addressCode',
    event: 'addressSelect'
  },

  props: {
    hideCity: { // 隐藏市
      type: Boolean,
      default: false
    },
    hideArea: { // 隐藏区/县
      type: Boolean,
      default: false
    },
    addressCode: null // 地址编码
  },

  data() {
    return {
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
      areaList: [], // 区/县列表
      provinceCode: '', // 省份编码
      cityCode: '', // 城市编码
      areaCode: '', // 区/县编码
      cityFlag: false, // 避免重复请求的标志
      provinceFlag: false,
      areaFlag: false
    }
  },

  computed: {
  },
  watch: {
    addressCode: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.addressCodeToList(newVal)
        } else {
          this.$nextTick(() => {
            this.reset()
          })
        }
      }
    }
  },

  created() {
    this.getProvinces()
  },

  methods: {
    /**
     * 获取数据
     * @param {Array} array 列表
     * @param {String} type 请求数据类型
     * @param {String} code 编码(上一级编码)
     */
    fetchData(array, type, code) {
      getAddressByCodeAndType({ type: type, code: code })
        .then(res => {
          const body = res.data || []
          // console.log(body)
          array.splice(0, array.length, ...body)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(res => {
        })
    },
    // 根据国家编码获取省份列表
    getProvinces() {
      if (this.provinceFlag) {
        return
      }
      this.fetchData(this.provinceList, "province", 156)
      this.provinceFlag = true
    },
    // 省份修改，拉取对应城市列表
    changeProvince(val) {
      this.fetchData(this.cityList, "city", this.provinceCode)
      this.cityFlag = true
      this.cityCode = ''
      this.areaCode = ''
      this.$emit('addressSelect', val)
    },
    // 根据省份编码获取城市列表
    getCities() {
      if (this.cityFlag) {
        return
      }
      if (this.provinceCode) {
        this.fetchData(this.cityList, "city", this.provinceCode)
        this.cityFlag = true
      }
    },
    // 城市修改，拉取对应区域列表
    changeCity(val) {
      this.fetchData(this.areaList, "area", this.cityCode)
      this.areaFlag = true
      this.areaCode = ''
      this.$emit('addressSelect', val)
    },
    // 根据城市编码获取区域列表
    getAreas() {
      if (this.areaFlag) {
        return
      }
      if (this.cityCode) {
        this.fetchData(this.areaList, "area", this.cityCode)
      }
    },
    // 区域修改
    changeArea(val) {
      this.$emit('addressSelect', val)
    },
    // 重置省市区/县编码
    reset() {
      this.provinceCode = ''
      this.cityCode = ''
      this.areaCode = ''
    },
    // 地址编码转换成省市区列表
    addressCodeToList(addressCode) {
      if (!addressCode) return false
      getFullAddressByCode({ code: addressCode })
        .then(res => {
          const data = res.data
          if (!data) return
          if (data.provinceCode) {
            this.provinceCode = data.provinceCode
            this.fetchData(this.cityList, "city", this.provinceCode)
          }
          if (data.cityCode) {
            this.cityCode = data.cityCode
            this.fetchData(this.areaList, "area", this.cityCode)
          }
          if (data.areaCode) {
            this.areaCode = data.areaCode
          }
        })
        .finally(res => {
        })
    },
    getData() {
      return this.provinceCode + ',' + this.cityCode + ',' + this.areaCode
    }
  }
}
</script>

<style lang="less" scoped>
</style>

