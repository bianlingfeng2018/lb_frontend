<template>
  <div class="app-container ohn ">
    <el-divider class=" mt20" content-position="left">Applicant Information</el-divider>
    <el-form
      ref="postForm"
      class="mt36"
      :inline="true"
      :model="postForm"
      status-icon
      :rules="rules"
      label-width="150px">
      <el-form-item label="Application Name">
        <el-input v-model="postForm.comAddrCn" placeholder="Ningbo Zhilang Technology Co., LTD " clearable style="width: 500px"/>
      </el-form-item>
      <br>
      <el-form-item label="Applicant Address" prop="comAddrCn">
        <el-input v-model="postForm.comAddrCn" placeholder="address " clearable style="width: 500px"/>
      </el-form-item>
      <br>
      <el-form-item label="Country of Origin">
        <el-radio-group v-model="postForm.originCountry" style="width: 240px">
          <el-radio :label="1" >China</el-radio>
          <el-radio :label="2"  >Other</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Exporting country" prop="exportedTo">
        <el-select v-model="postForm.exportedTo" style="width: 240px" placeholder="All countries">
          <el-option v-for="item in exportList" :key="item.id" :label="item.name" :value="item.name"/>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="Test Product">
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio :label="1" >Electric equipment</el-radio>
          <el-radio :label="2"  >Sundry goods</el-radio>
          <el-radio :label="3"  >Textile</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider class=" mt20" content-position="left">Importer information</el-divider>
      <el-form-item label="Importer information">
        <el-input v-model="postForm.comAddrCn" placeholder="Please enter the Importer information " clearable style="width: 500px"/>
      </el-form-item>
      <el-divider class=" mt20" content-position="left">Inspection Booking</el-divider>
      <el-form-item label="Inspection times" prop="exportedTo">
        <el-radio-group v-model="postForm.originCountry">
          <el-radio :label="1" >First inspection</el-radio>
          <el-radio :label="2"  >First Retest</el-radio>
          <el-radio :label="3"  >Second Retest</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Inspection date" prop="exportedTo">
        <el-date-picker v-model="postForm.batchTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="Please enter"
                        style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item label="Inspection company" prop="comAddrCn">
        <el-input v-model="postForm.comAddrCn"  clearable style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item label="Inspection place" prop="comAddrCn">
        <async-address ref="addr" :hide-area="false" :hide-city="false" :address-code="postForm.addr"/>
        <el-input v-model="postForm.comAddrCn" placeholder="Inspection Address " clearable
                  style="width: 240px;margin-left: 20px;"/>
      </el-form-item>
      <br>
      <el-form-item label="Contact Person" prop="comAddrCn">
        <el-input v-model="postForm.attn" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="Mobile" prop="telClient">
        <el-input v-model="postForm.telClient" type="number"  clearable style="width: 240px"/>
      </el-form-item>
      <br>
      <el-form-item label="Email" prop="email">
        <el-input v-model="postForm.email" clearable style="width: 240px"/>
      </el-form-item>
      <el-divider class=" mt20" content-position="left">Sampling</el-divider>
      <el-form-item label="Approval Sample Getting" prop="email">
        <el-radio-group v-model="postForm.originCountry" >
          <el-radio label="Send to LTI">
          </el-radio>
          <el-input
            v-model="postForm.reportTitleCn"
            placeholder="ExpressNumber"
            clearable
            style="width: 200px "/>
          <el-radio class="ml16" label="Sealed at Factory">
          </el-radio>
          <el-input
            v-model="postForm.reportTitleCn"
            placeholder="The number of samples"
            clearable
            style="width: 200px "/>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="Sample Purpose" prop="email">
        <el-radio-group v-model="postForm.originCountry" style="width: 240px">
          <el-radio :label="1"  >Testing</el-radio>
          <el-radio :label="2"  >Reserved sample</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Sample preparation" style="margin-left: 50px">
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio :label="1"  >Reserved sample（One month）</el-radio>
          <el-radio :label="2"  >Withdraw sample</el-radio>
          <el-radio :label="3"  >Other</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider class=" mt20" content-position="left">Inspection Requirement</el-divider>
      <el-form-item label="Inspection type" prop="sampleDeal">
        <el-radio-group v-model="postForm.sampleDeal" >
          <el-radio :label="1" >PRE inspection</el-radio>
          <el-radio :label="2"  >During-production inspection</el-radio>
          <el-radio :label="3"  >Finished product Inspection</el-radio>
          <el-radio :label="4"  >Re-inspection</el-radio>
          <el-radio :label="5"  >Loading supervision</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="Sampling Level" >
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio :label="1"  >Textile Inspection SOP(Standard Operation Procedure) MIL-STD-105E</el-radio>
          <el-radio :label="2"  >Household and related electrical appliances Inspection SOP MIL-STD-105E</el-radio>
          <el-radio :label="3"  >Sundry goods Inspection SOP MIL-STD-105E</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="Total order sampling" >
        <el-radio-group v-model="postForm.sampleDeal" style="width: 300px">
          <el-radio :label="1"  >G-Ⅰ</el-radio>
          <el-radio :label="2"  >G-Ⅱ</el-radio>
          <el-radio :label="3"  >G-Ⅲ</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Product function test sampling" style="margin-left: 50px">
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio :label="1"  >S-1</el-radio>
          <el-radio :label="2"  >S-2</el-radio>
          <el-radio :label="3"  >S-3</el-radio>
          <el-radio :label="4"  >S-4</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="AQL Level">
        <el-radio-group v-model="postForm.sampleDeal">
          <el-radio :label="1"  >Critical 0</el-radio>
          <el-radio :label="2"  >Major 2.5</el-radio>
          <el-radio :label="3"  >Minor4.0</el-radio>
          <el-radio :label="4"  >Othe</el-radio>
        </el-radio-group>
        <el-input
          v-if="postForm.sampleDeal == 4"
          v-model="postForm.reportTitleCn"
          clearable
          style="width: 200px "/>
      </el-form-item>
      <el-divider class=" mt20" content-position="left">Information Attached</el-divider>
      <el-form-item label="Photos of Products" prop="sampleDeal">
        <el-upload
          ref="upload1"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.gif"
          action=""
          :on-change="uploadChange"
          :on-success="onSuccess"
          :on-error="onError"
          :limit="1"
          :http-request="submitFile"
          :on-exceed="exceed"
          :file-list="multpartfile"
          :auto-upload="false" >
          <el-button slot="trigger" size="small">select</el-button>
          <div slot="tip" class="el-upload__tip">
            support jpg、jpeg、gif、png
          </div>
        </el-upload>
      </el-form-item>
      <br>
      <el-form-item label="Packing list and invoice" prop="attn">
        <el-input v-model="postForm.attn" placeholder="Packing list" clearable style="width: 240px"/>
        <br>
        <el-input class="mt8" v-model="postForm.attn" placeholder="invoice" clearable style="width: 240px"/>
        <br>
        <el-upload
          class="mt8"
          ref="upload2"
          accept=".xls,.xlsx"
          action=""
          :on-change="uploadChange"
          :on-success="onSuccess"
          :on-error="onError"
          :limit="1"
          :http-request="submitFile"
          :on-exceed="exceed"
          :file-list="multpartfile"
          :auto-upload="false" >
          <el-button slot="trigger" size="small">select</el-button>
          <div slot="tip" class="el-upload__tip">
            support xls,xlsx
          </div>
        </el-upload>
      </el-form-item>
      <div class="tc">
        <el-button type="primary" @click="submitForm('postForm')">Submit</el-button>
        <el-button @click="resetForm('postForm')">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { deepClone } from "@/utils"
  import methods from "@/views/transactionManagement/detection/pub_methods/validate"
  export default {
    name: "order",
    data() {
      return {
        rules: methods.orderValidate,
        postForm: {
          credentials: [],
        },
        uploadForm: new FormData(),
        multpartfile: [],
      }
    },
    created() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            if (this.multpartfile.length !== 0) {
              // 文件
              this.$refs.upload1.submit()
            }else{

            }
          } else {

          }
        })
      },
      uploadChange(file, fileList) {
        this.multpartfile = fileList;
      },
      onSuccess(response, file) {
        this.$message({
          showClose: true,
          message: '提交成功',
          type: 'success'
        });
        this.multpartfile = [];
      },
      onError(err, file, multpartfile) {
        this.$message({ showClose: true, message: err, type: 'error' });
      },
      exceed() {
        this.$message({ showClose: true, message: '请先删除已选中文件', type: 'error' });
      },
      submitFile(file) {
        this.uploadForm.append("file", file.file);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
