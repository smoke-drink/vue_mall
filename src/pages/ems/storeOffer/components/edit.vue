<template>
  <div>
    <Form class="panel-form"
          ref="form"
          :model="detail"
          :rules="rules"
          :label-width="120">
      <FormItem label="商品分类"
                prop="typeId">
        <Poptip title="商品分类"
                placement="bottom-start"
                :width="300">
          <div class="select-type">
            <Tag v-for="(item, index) in type" :key="item.id" :name="item.id" closable @on-close="closeTag(index)">{{ item.title }}</Tag>
          </div>
          <div slot="content">
            <CheckboxGroup v-model="typeId">
              <Tree :data="treeData"
                    ref="tree"
                    :render="renderContent"></Tree>
            </CheckboxGroup>
          </div>
        </Poptip>
      </FormItem>
      <FormItem label="商品名称"
                prop="name"
                class="mt-25">
        <i-input v-model="detail.name"
                 placeholder="请输入商品名称"
                 type="text"
                 style="width:280px"></i-input>
      </FormItem>
      <FormItem label="产品图片"
                class="mt-25">
        <!--<vma-image-upload v-model="surfacePlot"-->
        <!--:limit="5"></vma-image-upload>-->
        <Button type="primary"
                @click="clickSelectSurfacePlot" style="margin-bottom: 5px">选择产品图片
        </Button>
        建议尺寸：690*690
        <br/>
        <img v-for="(img,i) in surfacePlot"
             :key="i" :src="img"
             alt=" " width="60px" height="60px" style="margin-right: 5px" v-on:click="delSurfacePlot(i)">
      </FormItem>
      <FormItem label="产品详情描述" prop="num" class="mt-25">
            <i-input v-model="detail.content" style="width:280px" type="textarea"></i-input>
        </FormItem>
      <FormItem label="产品详情图片"
                class="mt-25">
        <vma-image-upload v-model="detailPlot"
                          :limit="25"></vma-image-upload>
      </FormItem>
      <FormItem label="商品所属"
                class="mt-25">
        <p v-if="personTreeData[0] !== undefined && personTreeData[0].checked === true">{{staffNum}}/{{staffNum}}</p>
        <p v-if="personTreeData[0] !== undefined &&personTreeData[0].checked !== true">{{detail.staffInfo.length}}/{{staffNum}}</p>
        <Button type="success" @click="getPersonTree">编辑</Button>
      </FormItem>
      <FormItem label="线上交易"
                prop="isPayOnline"
                class="mt-25">
        <Checkbox v-model="status">支持在商城内完成支付</Checkbox>
      </FormItem>
      <div v-if="status">
        <FormItem label="商品提成"
                  class="mt-25">
          <RadioGroup v-model="detail.extractType">
            <Radio :label="1">
              <span>每件商品固定提成</span>
            </Radio>
            <Radio :label="0">
              <span>成交价</span>
            </Radio>
          </RadioGroup>
          <br/>
          <FormItem prop="extractValue"
                    class="mt-15"
                    v-if="this.detail.extractType === 1">
            <i-input type="text"
                     v-model="detail.extractValue"
                     style="width:120px"></i-input>
            元
          </FormItem>
          <FormItem prop="extractPer"
                    class="mt-15"
                    v-if="this.detail.extractType === 0">
            <i-input type="text"
                     v-model="detail.extractPer"
                     style="width:120px"></i-input>
            %
          </FormItem>
        </FormItem>
      </div>
      <FormItem v-if="status"
                label="分销佣金设置"
                prop="isPayOnline"
                class="mt-25">
        <RadioGroup v-model="commissionType">
          <Radio label="one">
            <span>应用全局规则</span>
          </Radio>
          <Radio label="two">
            <span>自定义</span>
          </Radio>
        </RadioGroup>
        <div class="line">
          <span style="float: left">分销佣金比例(外部人员)：</span>
          <Input v-if="commissionType === 'one'" disabled v-model="overAll.outPersent" style="width: 50px" />
          <Input v-if="commissionType === 'two'" v-model="detail.outPersent" style="width: 50px" @on-change="editOutPersent" />
        </div>
        <div class="line">
          <span style="float: left">销售佣金比例(企业员工)：</span>
          <Input v-if="commissionType === 'one'" disabled v-model="overAll.inPersent" style="width: 50px" />
          <Input v-if="commissionType === 'two'" disabled v-model="detail.inPersent" style="width: 50px" />
        </div>
      </FormItem>
      <FormItem label="积分获取设置"
                class="mt-25">
        <RadioGroup v-model="detail.integral_type">
          <Radio label="1">
            <span>使用全局规则</span>
          </Radio>
          <Radio label="2">
            <span>自定义</span>
          </Radio>
          <Radio label="3">
            <span>无积分</span>
          </Radio>
        </RadioGroup>
        <div class="clear" v-if="detail.integral_type==='2'">
          <RadioGroup v-model="detail.custom_type">
            <Radio label="1">
              <span>固定</span>
            </Radio>
            <Radio label="2">
              <span>百分比(%)</span>
            </Radio>
          </RadioGroup>
          <div class="line" v-if="detail.custom_type==='1'">
            <span style="float: left">固定获得：</span>
            <Input v-model="detail.custom_value" style="width: 50px" />
          </div>
          <div class="line" v-if="detail.custom_type==='2'">
            <span style="float: left">成交金额百分比：</span>
            <Input v-model="detail.custom_value" style="width: 50px" />
          </div>
        </div>
      </FormItem>
      <FormItem label="商品规格"
                class="mt-25"
                v-if=" id !== ''">
        <RadioGroup v-model="detail.type">
          <Radio :label="0"
                 disabled>
            <span>单规格</span>
          </Radio>
          <Radio :label="1"
                 disabled>
            <span>多规格</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="商品规格"
                class="mt-25"
                v-if=" id === ''">
        <RadioGroup v-model="detail.type">
          <Radio :label="0">
            <span>单规格</span>
          </Radio>
          <Radio :label="1">
            <span>多规格</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <div v-if="detail.type === 0 || detail.type === ''">
        <FormItem label="规格名称  " class="mt-25">
          <i-input v-model="singleNorms.name" type="text" style="width:120px"></i-input>
        </FormItem>
        <FormItem label="售价  " prop="price" class="mt-25">
          <i-input v-model="singleNorms.price" style="width:120px" type="text"></i-input>
          元
        </FormItem>
        <FormItem label="库存  " prop="num" class="mt-25">
          <i-input v-model="singleNorms.num" style="width:120px" type="text"></i-input>
          件
        </FormItem>
        <FormItem label="规格图片  " prop="url" class="mt-25">
          <Button type="primary"
                  @click="clickSelectNormsPic" style="margin-bottom: 5px">选择规格图片
          </Button>
          建议尺寸：690*690
          <br/>
          <img v-if="singleNorms.url" :src="singleNorms.url" alt=" " width="60px" height="60px" style="margin-right: 5px">
        </FormItem>
        <CropperImg v-model="isShowNormsCropper"
                    ref='cropperImg1'
                    @on-success='singleNormImgUploadSuccess'></CropperImg>
      </div>
      <div class="more-norms"
           v-if="detail.type === 1">
        <Button type="primary"
                @click="addOneNorms">添加
        </Button>
        <Table :columns="table.columns"
               :data="moreNorms"
               ref="table"/>
        <upload-img v-model="uploadVisible"
                    :urlDetaill="urlDetaill"></upload-img>
      </div>
      <FormItem label=""
                class="mt-25">
        <RadioGroup v-model="detail.status">
          <Radio :label="0">
            <span>暂不上架（添加至未上架）</span>
          </Radio>
          <Radio :label="1">
            <span>即时上架（添加至已上架）</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <div class="handle-edit-btn">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary"
                @click="handlerSave">确定
        </Button>
      </div>
    </Form>
    <CropperImg v-model="isShowCropper"
                ref='cropperImg1'
                @on-success='uploadSuccess'></CropperImg>
    <!-- 批量修改佣金 -->
    <Modal v-model="editStoreStaffVisible" title="选择员工">
      选择员工:
      <Tree :data="personTreeData"
            ref="personTree"
            show-checkbox
            multiple></Tree>
      <div slot="footer">
        <Button type="success"
                @click="saveSelectPerson">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {storeOfferApi, traderSettingApi, personApi} from '@/api/ems'
import {INIT_DETAIL} from '../src/const.js'
import {doubleValidator} from '@/assets/js/asyncValidator/validators'
import CropperImg from './cropperImg'
import UploadImg from './uploadImg'

export default {
  props: {
    value: false,
    editId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detail: {
        ...INIT_DETAIL
      },
      typeId: [],
      status: true,
      rules: {
        name: [
          {required: true, message: '请输入正确的商品名'}
        ],
        extractValue: [
          {required: true, message: '请输入正确的数值'},
          {validator: doubleValidator}
        ],
        extractPer: [
          {required: true, message: '请输入正确的数值'},
          {validator: doubleValidator}
        ]
      },
      moreNorms: [],
      singleNorms: {
        type: 0,
        isDefault: 1,
        name: '',
        price: 0,
        num: 0,
        url: ''
      },
      id: '',
      surfacePlot: [],
      detailPlot: [],
      isShowCropper: false,
      isShowDetailCropper: false,
      uploadVisible: false,
      isShowNormsCropper: false,
      editStoreStaffVisible: false,
      table: {
        columns: [{
          title: '规格图片',
          key: 'url',
          render: (h, params) => {
            return (<img src = {params.row.url}width = "60px"height = "60px" on-click = {() => { this.uploadImg(params) }}/>)
          }
        }, {
          title: '规格名称',
          key: 'name',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.name
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].name = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '商品单价',
          key: 'price',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.price
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].price = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '库存',
          key: 'num',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.num
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].num = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '默认/非默认',
          render: (h, {row, column, index}) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.isDefault === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (value) {
                    for (let i = 0; i < this.moreNorms.length; i++) {
                      this.moreNorms[i].isDefault = 0
                    }
                    this.moreNorms[index].isDefault = 1
                  } else {
                    this.moreNorms[0].isDefault = 1
                    this.moreNorms[index].isDefault = 0
                  }
                }
              }
            })
          }
        }, {
          title: '操作',
          render: (h, {row, column, index}) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let status = false
                    if (row.isDefault === 1) {
                      status = true
                    }
                    this.moreNorms.splice(index, 1)
                    if (status) {
                      this.moreNorms[0].isDefault = 1
                    }
                  }
                }
              }, '删除')
            ])
          }
        }]
      }, // 上传图片
      urlDetaill: {
        index: 0,
        url: ''
      },
      normsData: [],
      treeData: [], // tree的数据
      personTreeData: [],
      overAll: {
        outPersent: 0,
        inPersent: 0
      },
      commissionType: 'one',
      type: [],
      typeExample: [],
      staffNum: 0
    }
  },
  components: {
    CropperImg,
    UploadImg
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value(n) {
      if (n) {
        if (this.editId) {
          this.id = this.editId
          this.loadDetail()
        } else {
          this.moreNorms = []
          this.singleNorms = {
            type: 0,
            isDefault: 1,
            name: '',
            price: 0,
            num: 0,
            url: ''
          }
        }
      }
    },
    typeId: {
      handler: function (newVal) {
        this.type = []
        for (let i = 0; i < newVal.length; i++) {
          for (let j = 0; j < this.typeExample.length; j++) {
            if (newVal[i] === this.typeExample[j].id) {
              this.type.push(this.typeExample[j])
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    loadDetail() {
      if (!this.id) {
        return
      }
      storeOfferApi.getStoreDetailNew(this.id).then(data => {
        console.log(JSON.stringify(data))
        this.detail = data
        this.surfacePlot = []
        this.detailPlot = []
        this.extractPer = this.detail.extractPer
        this.extractValue = this.detail.extractValue
        for (let i = 0; i < data.imgs.length; i++) {
          if (data.imgs[i].type === 1) {
            this.surfacePlot.push(data.imgs[i].url)
          } else {
            this.detailPlot.push(data.imgs[i].url)
          }
        }
        if (!this.detail.outPersent) {
          this.detail.inPersent = this.overAll.inPersent
          this.detail.outPersent = this.overAll.outPersent
        }
        if (this.detail.outPersent === this.overAll.outPersent) {
          this.commissionType = 'one'
        } else {
          this.commissionType = 'two'
        }
        if (this.detail.isPayOnline === 1) {
          this.status = true
        } else {
          this.status = false
        }
        if (this.detail.type === 1) {
          this.moreNorms = this.detail.norms
        } else {
          this.singleNorms = this.detail.norms[0]
        }
        for (let i = 0; i < this.detail.typeInfo.length; i++) {
          for (let j = 0; j < this.typeExample.length; j++) {
            if (this.detail.typeInfo[i].name === this.typeExample[j].title) {
              this.type.push(this.typeExample[j])
              this.typeId.push(this.typeExample[j].id)
            }
          }
        }
      })
    },
    async handlerSave() {
      this.detail.offerTypeId = this.typeId
      if (this.detail.name === null || this.detail.name === undefined || this.detail.name === '') {
        this.$Message.error({
          content: '请输入商品名',
          duration: 10,
          closable: true
        })
        return
      }
      this.detail.staffId = []
      for (let i = 0; i < this.$refs.personTree.getCheckedNodes().length; i++) {
        this.detail.staffId.push(this.$refs.personTree.getCheckedNodes()[i].id)
      }
      if (this.commissionType === 'one') {
        this.detail.inPersent = this.overAll.inPersent
        this.detail.outPersent = this.overAll.outPersent
      }
      if (this.detail.type === 0) {
        this.detail.norms[0] = this.singleNorms
      } else {
        this.detail.norms = this.moreNorms
      }
      if (this.detail.type === 0 && (this.detail.norms[0].name === '' || this.detail.norms[0].price === '' || this.detail.norms[0].num === '' || this.detail.norms[0].name === null || this.detail.norms[0].price === null || this.detail.norms[0].num === null || this.detail.norms[0].name === undefined || this.detail.norms[0].price === undefined || this.detail.norms[0].num === undefined || this.detail.norms[0].url === '')) {
        this.$Message.error({
          content: '请添加并完善规格',
          duration: 10,
          closable: true
        })
        return
      } else if (this.detail.type === 1 && (this.detail.norms[0].name === '' || this.detail.norms[0].price === '' || this.detail.norms[0].num === '' || this.detail.norms[0].name === null || this.detail.norms[0].price === null || this.detail.norms[0].num === null || this.detail.norms[0].name === undefined || this.detail.norms[0].price === undefined || this.detail.norms[0].num === undefined || this.detail.norms[0].url === '')) {
        this.$Message.error({
          content: '请添加并完善至少一个规格',
          duration: 10,
          closable: true
        })
        return
      }
      if (this.surfacePlot.length === 0) {
        this.$Message.error({
          content: '请上传产品图',
          duration: 10,
          closable: true
        })
        return
      }
      if (this.detailPlot.length === 0) {
        this.$Message.error({
          content: '请上传产品详情图',
          duration: 10,
          closable: true
        })
        return
      }
      let tempArray = []
      for (let i = 0; i < this.surfacePlot.length; i++) {
        let tempObj = {}
        tempObj.sort = i + 1
        tempObj.type = 1
        tempObj.url = this.surfacePlot[i]
        tempArray.push(tempObj)
      }
      for (let i = 0; i < this.detailPlot.length; i++) {
        let tempObj = {}
        tempObj.sort = i + 1
        tempObj.type = 2
        tempObj.url = this.detailPlot[i]
        tempArray.push(tempObj)
      }
      this.detail.imgs = tempArray
      if (this.status) {
        this.detail.isPayOnline = 1
      } else {
        this.detail.isPayOnline = 0
        this.detail.extractType = 0
        this.detail.extractValue = 0
        this.detail.extractPer = 0
      }
      const integer = /^-?\d+$/
      const float = /^\d+(\.\d+)?$/
      for (let i = 0; i < this.detail.norms.length; i++) {
        if (!integer.test(this.detail.norms[i].num) || !float.test(this.detail.norms[i].price)) {
          this.$Message.error({
            content: '商品价格与库存只能填写数字',
            duration: 10,
            closable: true
          })
          return
        }
      }
      let numCount = 0
      for (let i = 0; i < this.detail.norms.length; i++) {
        numCount += this.detail.norms[i].num
      }
      if (numCount <= 0) {
        this.detail.status = 2
      }
      if (this.commissionType === 'one') {
        this.detail.inPersent = this.overAll.inPersent
        this.detail.outPersent = this.overAll.outPersent
      }
      if (this.id) {
        this.detail.id = this.id
        await storeOfferApi.updateStoreNew(this.detail)
      } else {
        await storeOfferApi.addStoreNew(this.detail)
      }
      this.surfacePlot = []
      this.detailPlot = []
      if (this.detail.status === 1) {
        this.$emitBus('offerUpListChange', 'offerUpListChange')
      } else if (this.detail.status === 0) {
        this.$emitBus('offerDownedListChange', 'offerDownedListChange')
      } else if (this.detail.status === 2) {
        this.$emitBus('offerSoldOutListChange', 'offerSoldOutListChange')
      }
      this.$emit('after-save')
      this.handlerCancel()
    },
    handlerCancel() {
      this.$refs.form.resetFields()
      this.id = ''
      this.detail = {
        ...INIT_DETAIL
      }
      this.surfacePlot = []
      this.detailPlot = []
      // this.singleNorms = null
      this.moreNorms = []
      this.$emit('after-cancel')
      this.visible = false
      this.typeId = []
    },
    clickSelectSurfacePlot() {
      if (this.surfacePlot.length < 5) {
        this.isShowCropper = true
      } else {
        this.$Message.error('产品图已达上限，请删除现有图片！')
      }
    },
    uploadSuccess(url) {
      this.surfacePlot.push(url)
    },
    // uploadDetailSuccess(url) {
    //   this.detailPlot.push(url)
    // },
    delSurfacePlot(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认删除该产品图片？</p>',
        onOk: () => {
          this.surfacePlot.splice(i, 1)
        },
        onCancel: () => {
        }
      })
    },
    addOneNorms() {
      if (this.moreNorms.length === 0) {
        this.moreNorms.push({
          url: 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id',
          name: '',
          price: '',
          num: '',
          type: 1,
          isDefault: 1
        })
      } else {
        this.moreNorms.push({
          url: 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id',
          name: '',
          price: '',
          num: '',
          type: 1,
          isDefault: 0
        })
      }
    },
    uploadImg(params) {
      this.urlDetaill.index = params.index
      if (params.row.url !== 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id') {
        this.urlDetaill.url = params.row.url
      }
      this.uploadVisible = true
    },
    clickSelectNormsPic() {
      this.isShowNormsCropper = true
    },
    singleNormImgUploadSuccess(url) {
      this.singleNorms.url = url
    },
    closeTag(index) {
      this.typeId.splice(index, 1)
    },
    getDefaultCommission() {
      traderSettingApi.get().then(data => {
        this.overAll.inPersent = data.inPresent
        this.overAll.outPersent = data.outPresent
      })
    },
    editOutPersent() {
      this.detail.inPersent = 100 - this.detail.outPersent
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block'
        }
      }, [
        h('span', [
          h('Checkbox', {
            props: {
              label: data.id
            }
          }, [
            h('span', data.title)
          ])
        ])])
    },
    getPersonTreeData(id) {
      personApi.personTree(id).then(data => {
        this.personTreeData = data
      })
    },
    getAllPersonTreeData() {
      personApi.allPersonTree().then(data => {
        this.personTreeData = data
      })
    },
    getPersonTree() {
      this.editStoreStaffVisible = true
    },
    saveSelectPerson() {
      this.detail.staffInfo = []
      for (let i = 0; i < this.$refs.personTree.getCheckedNodes().length; i++) {
        this.detail.staffInfo.push({name: this.$refs.personTree.getCheckedNodes()[i].title, value: this.$refs.personTree.getCheckedNodes()[i].id})
      }
      this.editStoreStaffVisible = false
    },
    getStaffNum() {
      personApi.staffNum().then(data => {
        this.staffNum = data
      })
    }
  },
  created() {
    this.$onBus('moreNormsUrlChange', target => {
      let index = target.index
      this.moreNorms[index].url = target.url
    })
    this.getAllPersonTreeData()
    this.$onBus('getOfferDetail', target => {
      if (target != null && target !== '') {
        this.getPersonTreeData(target)
      } else {
        this.getAllPersonTreeData()
      }
    })
    storeOfferApi.classifyTree().then(data => { // 获取树的数据
      this.treeData = data
      for (let i = 0; i < data.length; i++) {
        this.typeExample.push({id: data[i].id, title: data[i].title})
        if (data[0].children) {
          for (let j = 0; j < data[i].children.length; j++) {
            this.typeExample.push({id: data[i].children[j].id, title: data[i].children[j].title})
          }
        }
      }
    })
    this.getStaffNum()
    this.getDefaultCommission()
  }
}
</script>

<style scoped lang='scss'>
  .more-norms {
    margin-top: 20px;
    position: relative;
    .ivu-btn {
      position: absolute;
      top: -50px;
      right: 0;
      z-index: 200;
    }
  }
  .select-type {
    width: 600px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 5px;
    min-height: 28px;
    overflow: hidden;
  }
</style>
