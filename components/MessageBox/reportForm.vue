<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRuntimeConfig } from '#imports';

export default defineComponent({
  props: {
    isShow: {
      default: ref(false),
      type: Boolean,
    },
  },

  setup(props, { emit }) {
    const reasonList = ['内容违规', '内容低质', '侵犯权益', '其他原因'];
    const reasonOptionList = [
      ['低俗色情', '内容抄袭', '涉嫌违法', '恶意营销'],
      ['内容质量太差'],
      ['侵犯名誉/隐私/著作/肖像权等'],
      ['其他原因'],
    ];
    const formSize = ref('default');
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      checkReason: ref(''),
      link: '',
      name: '',
      phone: '',
      content: '',
    });
    const rules = reactive<FormRules>({
      checkReason: [
        {
          type: 'string',
          required: true,
          message: '请选择投诉文章的原因',
          trigger: 'change',
        },
      ],
      link: [
        {
          type: 'string',
          required: true,
          message: '请输入原创链接',
          trigger: 'blur',
        },
      ],
      name: [
        {
          type: 'string',
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        },
      ],
      phone: [
        {
          type: 'string',
          required: true,
          message: '请填写手机号',
          trigger: 'blur',
        },
        {
          pattern: '^(13[0-9]|14[5-9]|15[0-35-9]|16[25-7]|17[0-8]|18[0-9]|19[0135689])[0-9]{8}$',
          message: '请填写正确的手机号',
          trigger: 'blur',
        },
      ],
      content: [
        {
          type: 'string',
          required: true,
          message: '请输入补充说明',
          trigger: 'blur',
        },
      ],
    });
    const runtimeConfig = useRuntimeConfig();

    let isCenterDialog = true;
    let flag = ref(0);

    // 获取单选框样式
    function getOptionClass(option: string): Array<string> {
      let classArr: Array<string> = ['radio-option'];
      if (ruleForm.checkReason == option) {
        classArr.push('radio-option__check');
      }

      return classArr;
    }

    // 改变展示的输入框
    function changeInput(option: string) {
      if (option == '内容抄袭') {
        flag.value = 1;
      } else if (option == '侵犯名誉/隐私/著作/肖像权等') {
        flag.value = 2;
      } else {
        flag.value = 0;
      }
    }

    function submit() {
      console.log('举报成功');
      // 发送请求
      emit('changeState', false);
      // $emit('changeState', false);
    }

    function cancel() {
      emit('changeState', false);
    }

    return {
      reasonList,
      reasonOptionList,
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      isCenterDialog,
      flag,
      runtimeConfig,
      getOptionClass,
      changeInput,
      submit,
      cancel,
    };
  },
});
</script>

<template scoped>
  <div v-show="isShow === true" @click.stop>
    <el-dialog
      :lock-scroll="false"
      v-model="isCenterDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      align-center
      title="举报反馈"
      width="640px"
    >
      <div>
        <div class="divider"></div>
        <div class="report-wrap">
          <div class="title">掘金工作人员会尽快受理你的举报，随后将通过站内信告知你处理的结果，请尽量补充完整描述</div>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="180px" :size="formSize" status-icon>
            <el-form-item label="请选择投诉文章的原因" prop="checkReason">
              <el-radio-group v-model="ruleForm.checkReason">
                <div v-for="(reason, index) in reasonList" :key="index">
                  <div class="title-reason">{{ reason }}</div>
                  <div class="radio-options-wrapper">
                    <el-radio
                      :class="getOptionClass(option)"
                      @click="changeInput(option)"
                      v-for="(option, index2) in reasonOptionList[index]"
                      :key="index2"
                      :label="option"
                      border
                      >{{ option }}</el-radio
                    >
                  </div>
                </div>
              </el-radio-group>
            </el-form-item>

            <div v-show="flag == 1">
              <div class="title-link">原创链接</div>
              <el-form-item label="原创链接" prop="link">
                <el-input class="input-link" v-model="ruleForm.link" placeholder="请输入" />
              </el-form-item>
            </div>

            <div v-show="flag == 2">
              <div class="title-link">权利人资料</div>
              <el-form-item label="姓名" prop="name">
                <el-input class="input-name" v-model="ruleForm.name" placeholder="请输入" maxlength="6" />
              </el-form-item>

              <el-form-item label="手机号" prop="phone">
                <el-input class="input-phone" v-model="ruleForm.phone" placeholder="请输入" maxlength="11" />
              </el-form-item>
            </div>

            <el-form-item label="补充说明" prop="content">
              <!-- <textarea
                v-model="ruleForm.content"
                maxlength="100"
                rows="4"
                placeholder="请输入举报相关的补充说明"
                spellcheck="false"
              ></textarea> -->
              <el-input
                type="textarea"
                v-model="ruleForm.content"
                maxlength="100"
                :rows="4"
                placeholder="请输入举报相关的补充说明"
                spellcheck="false"
              >
              </el-input>
              <div class="show-num">{{ ruleForm.content.length }}/100</div>
            </el-form-item>

            <div class="title-upload">你可以上传相关证据或涉及举报内容具体位置的图片，帮助工作人员更快地核实处理</div>

            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
            >
              <img :src="`${runtimeConfig.app.baseURL}img/download.png`" class="download" />
              <el-icon class="avatar-uploader-icon"></el-icon>
            </el-upload>
          </el-form>
          <div class="btn-box">
            <button class="cancel" @click="cancel()">取消</button>
            <button class="confirm" @click="submit()">确定举报</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.avatar-uploader :deep(.el-upload) {
  position: relative;
  overflow: hidden;
  border: 1px dashed #dedfe6;
  border-radius: 6px;
  transition: 0.2s;
  cursor: pointer;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  width: 110px;
  height: 110px;
  font-size: 28px;
  text-align: center;
  color: #8c939d;
}

.download {
  position: absolute;
}

:deep(.el-dialog) {
  margin-top: 77px;
  width: 640px;
  height: 617px;
}

:deep(.el-dialog__header) {
  padding: 0;
  margin: 16px 20px;
  width: 600px;
}

:deep(.el-dialog__title) {
  font-size: 17px;
  color: #252933;
  font-weight: 500;
}

:deep(.el-dialog__close) {
  top: 2px;
  font-size: 18px;
}

:deep(.el-dialog__body) {
  padding: 0;
}

.divider {
  width: 100%;
  height: 1px;
  color: #282f38;
  background-color: #eaeaea;
}

.report-wrap {
  overflow: auto;
  padding: 0 20px 32px;
  width: 100%;
  height: 560px;
}

.report-wrap::-webkit-scrollbar {
  width: 5px;
}

.report-wrap::-webkit-scrollbar-thumb {
  background: #cfcfcf;
  border-radius: 10px;
}

.title {
  margin: 16px 0 24px;
  width: 100%;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #8a919f;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 28px;
}

:deep(.el-form-item__label) {
  display: block;
  padding-right: 0;
  margin-bottom: 12px;
  height: 22px;
  font-size: 14px;
  text-align: left;
  color: #939aa3;
  font-weight: 400;
  line-height: 22px;
}

:deep(.el-form-item__label::before) {
  font-family: SimSun, sans-serif;
}

:deep(.el-form-item__content),
:deep(.el-radio-group) {
  display: block;
}

.title-reason,
.title-link {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #252933;
}

:deep(.radio-options-wrapper) {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

:deep(.el-radio__input) {
  display: none;
}

.radio-option {
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: 0;
  margin-bottom: 12px;
  width: 135px;
  height: auto;
  color: #282f38;
  background: #f2f3f5;
  border: 0;
}

.radio-option__check {
  color: #1e80ff !important;
  background: #eaf2ff;
}

:deep(.el-radio__label) {
  padding: 12px;
  text-align: center;
  white-space: normal;
  line-height: 22px;
}

.title-link {
  margin-bottom: 8px;
}

.input-link,
.input-name,
.input-phone {
  width: 266px;
  color: #282f38;
}

:deep(.el-input__wrapper) span {
  display: none;
}

:deep(.el-textarea__inner) {
  padding: 6px 10px;
  width: 595px;
  height: 90px;
  font-size: 14px;
  color: #282f38;
  background: #f2f3f5;
  // border: 0.8px solid #e6e8eb;
  border-radius: 4px;
  outline: none;
  resize: none;
  line-height: 22px;
}

:deep(.el-textarea__inner:hover),
:deep(.el-textarea__inner:focus) {
  border: 0.8px solid #3370ff !important;
  box-shadow: 0 0 2px 2px #d6e8ff;
}

:deep(.el-textarea__inner:focus) {
  background: #fff;
}

.show-num {
  position: absolute;
  right: 6px;
  bottom: 0;
  color: #8a919f;
}

.title-upload {
  margin: 4px 0 8px;
  width: 100%;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #8a919f;
}

.btn-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

.cancel {
  width: 88px;
  height: 36px;
  color: #1e80ff;
  background: #1e80ff0d;
  border: 1px solid #1e80ff4d;
  border-radius: 4px;
}

.confirm {
  margin-left: 9.6px;
  width: 88px;
  height: 36px;
  color: #fff;
  background: #007fff;
  border-radius: 4px;
}
</style>
