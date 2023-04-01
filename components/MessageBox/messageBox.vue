<template>
  <div :style="['padding: 0 20px', 'padding-top: 12px']" :class="[getClass(), 'outer']">
    <div class="container" @click.stop="toArticle()">
      <div class="meta-container">
        <div class="author-message">
          {{ msgInfo.authorName }}
        </div>
        <div class="time">{{ useTimeFormat(msgInfo.createdAt) }}</div>
        <div class="tag-list">
          <div class="point" v-if="msgInfo.categoryName !== undefined">
            <span class="tag">{{ msgInfo.categoryName }}</span>
          </div>
          <div v-if="msgInfo.categoryName !== undefined">
            <span class="tag">{{ msgInfo.subcategoryName }}</span>
          </div>
        </div>
      </div>
      <div class="content-container">
        <div class="content-text">
          <div class="title-box">
            <div class="title">
              <div class="title-text">{{ msgInfo.title }}</div>
            </div>
          </div>
          <div class="message">{{ msgInfo.content.slice(2) }}</div>
          <ul class="action-list">
            <li class="action-item" v-show="msgInfo.view != undefined">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                t="1677044320561"
                class="icon-views"
                viewBox="0 0 1024 1024"
                version="1.1"
                p-id="3841"
                width="18"
                height="18"
                fill="none"
              >
                <path
                  d="M923.421 501.927c-31.19-83.254-86.289-154.373-159.107-205.71-74.638-52.55-162.384-80.464-254.013-80.464s-179.374 27.792-254.013 80.464c-72.94 51.458-127.917 122.576-159.107 205.71l-3.884 10.194 3.884 10.194c31.19 83.254 86.289 154.373 159.107 205.71 74.638 52.55 162.384 80.464 254.013 80.464s179.374-27.792 254.013-80.464c72.94-51.458 127.917-122.576 159.107-205.71l3.884-10.194-3.884-10.194zM510.301 750.356c-155.102 0-296.126-95.269-354.623-238.114 58.375-142.965 199.521-238.114 354.623-238.114 155.102 0 296.126 95.269 354.623 238.114-58.497 142.845-199.643 238.114-354.623 238.114z"
                  fill=""
                  p-id="3842"
                />
                <path
                  d="M510.301 357.99c-84.955 0-154.131 69.177-154.131 154.131s69.177 154.131 154.131 154.131 154.131-69.177 154.131-154.131-69.177-154.131-154.131-154.131zM510.301 607.998c-52.914 0-95.877-42.962-95.877-95.877s42.962-95.877 95.877-95.877 95.877 42.962 95.877 95.877-43.084 95.877-95.877 95.877z"
                  fill=""
                  p-id="3843"
                />
              </svg>
              <span :style="['margin-left: 4px']">{{ useNumFormat(msgInfo.view) || '浏览量' }}</span>
            </li>
            <li
              ref="li"
              :class="['action-item', 'likes', getLikeClass(), isLiked ? 'liked' : '']"
              v-show="msgInfo.view != undefined"
              @click.stop="like(msgInfo.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                t="1677044215001"
                class="icon-likes"
                viewBox="0 0 1024 1024"
                version="1.1"
                p-id="2792"
                width="16"
                height="16"
              >
                <path
                  d="M927.7 411.6c-29.1-37.3-73.4-59.1-121.4-59.8l-130.8-2c9.8-45.2 13.4-85.8 10.7-121.2-3.2-42.3-15.3-77.7-36-105-14.1-18.7-31.7-33.1-52.2-42.6-21.3-9.9-39.9-12-51.8-12-71.7 0-130 53.9-130 120.1 0 107.6-69.2 195.1-154.4 195.1h-121c-41.9 0-76 34.1-76 76v412.7c0 41.9 34.1 76 76 76h592c35.8 0 70.9-12 98.9-33.7C860 893.3 880 862.3 888 828l67.7-290.4c10.3-44.1 0.1-90-28-126zM225.9 876.8h-85.1c-2.2 0-4-1.8-4-4V460.2c0-2.2 1.8-4 4-4h85.1v420.6z m659.7-355.6l-67.7 290.4c-4.3 18.3-15 34.8-30.2 46.6-15.5 12-34.9 18.6-54.8 18.6h-435v-424c18.8-3.5 37-9.8 54.6-18.8 27.1-13.9 51.2-33.6 71.9-58.7 41.2-50.1 63.9-116.2 63.9-186.4 0-26.5 26-48.1 58-48.1 2.8 0 27.4 0.7 46.5 26 28.9 38.3 29.7 112.3 2.2 208.3-3.1 10.8-1 22.4 5.7 31.4s17.2 14.4 28.4 14.5l176.3 2.7c26.1 0.4 50.1 12.1 65.8 32.2 14.6 19 19.8 42.2 14.4 65.3z"
                  p-id="2793"
                />
              </svg>
              <span :style="['margin-left: 4px']">{{ useNumFormat(msgInfo.like) || '点赞' }}</span>
            </li>
          </ul>
        </div>
        <img
          class="img"
          v-show="msgInfo.coverImgURL != null"
          :src="msgInfo.coverImgURL ? msgInfo.coverImgURL : ''"
          :alt="msgInfo.title"
        />
      </div>
      <div class="tag-ad" v-show="msgInfo.isArticle !== true">广告</div>

      <div class="container-delete2" v-if="msgInfo.isArticle === true && msgInfo.type === '推荐'">
        <div
          style="display: block; width: 20px; height: 20px; line-height: 20px; text-align: center"
          @click.stop="dislike()"
        >
          <div class="icon-delete"></div>
        </div>
        <div class="dropdown-menu2">
          <div class="dropdown-menu2-item" @click.stop="dislike()">
            <img
              class="img2"
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/d51cb68873fed0eefbe66dd4323b5590.svg"
              alt="不感兴趣"
            />
            <span>不感兴趣</span>
          </div>
          <div @click.stop>
            <client-only>
              <el-tooltip class="item" effect="dark" :content="'屏蔽作者: ' + msgInfo.authorName" placement="top">
                <div class="dropdown-menu2-item" @click.stop="isCenterDialog = true">
                  <img
                    class="img2"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/bc11676ce6e57f9b6a31638cd903e3f7.svg"
                    alt="屏蔽作者"
                  />
                  <span> 屏蔽作者: {{ msgInfo.authorName }} </span>
                </div>
              </el-tooltip>
            </client-only>
          </div>
          <div>
            <div class="dropdown-menu2-item" @click.stop="isShowSelector = !isShowSelector">
              <img
                class="img2"
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/ee8bcf878773b9f4ed2fce9b786c455f.svg"
                alt="屏蔽标签"
              />
              <span>屏蔽标签</span>
              <img
                v-show="isShowSelector === false"
                class="img3"
                :src="`${runtimeConfig.app.baseURL}img/arrow-down.png`"
                alt="箭头"
              />
              <img
                v-show="isShowSelector === true"
                class="img3"
                :src="`${runtimeConfig.app.baseURL}img/arrow-up.png`"
                alt="箭头"
              />
            </div>
            <div v-show="isShowSelector === true" class="selector" @click.stop>
              <client-only>
                <el-checkbox-group v-model="checkTagGroup" size="small" class="select-area">
                  <!-- <el-checkbox
                  :label="item"
                  border
                  v-for="(item, index) in msgInfo.tagList"
                  :key="index"
                  :class="getOptionClass()"
                /> -->
                  <el-checkbox :label="msgInfo.categoryName" border :class="getOptionClass()" />
                  <el-checkbox :label="msgInfo.subcategoryName" border :class="getOptionClass()" />
                </el-checkbox-group>
              </client-only>
              <button :class="getShieldBtnClass()" @click.stop="shieldTag()" :disabled="shieldTagBtnDisabled">
                确定屏蔽
              </button>
            </div>
          </div>
          <div class="dropdown-menu2-item" @click.stop="showForm()">
            <img
              class="img2"
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/8039766ff47103b8c50b5cb4becf77d4.svg"
              alt="举报"
            />
            <span>举报</span>
          </div>
        </div>
      </div>

      <div @click.stop>
        <client-only>
          <el-dialog
            :append-to-body="true"
            v-model="isCenterDialog"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="312px"
            align-center
          >
            <div class="dialog-body">
              <p class="p1">
                <span>确定屏蔽</span><span class="username">{{ msgInfo.authorName }}</span
                ><span>吗？</span>
              </p>
              <p class="p2">首页推荐中将不再展现该作者文章</p>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <button @click.stop="isCenterDialog = false" class="btn-cancel">取消</button>
                <button @click.stop="shieldAuthor()" class="btn-confirm">确定</button>
              </div>
            </template>
          </el-dialog>
        </client-only>
      </div>

      <client-only>
        <ReportForm :is-show="isShowForm" @changeState="(value) => (isShowForm = value)"></ReportForm>
      </client-only>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MessageInfo, likeMessage } from '~~/composables/useMessageBox';
import { ref, reactive, useRuntimeConfig, useRouter } from '#imports';
import { Ref } from 'vue';
import type { PropType } from 'vue';
import { ElMessage } from 'element-plus';
import ReportForm from '@/components/MessageBox/reportForm.vue';
import { useNumFormat, useTimeFormat } from '~~/composables/useFormat';

const props = defineProps({
  msgInfo: {
    type: Object as PropType<MessageInfo>,
    required: true,
  },
});
const PropsRef = reactive({
  ...props,
});
const isLiked: Ref<boolean> = ref(false);
const runtimeConfig = useRuntimeConfig();

const li = ref<any>();
let msgInfo = reactive(props.msgInfo);
// let flag = 0;

// onMounted(() => {
//   nextTick(() => {
//     li.value.onmouseover = () => {
//       if (flag === 0) {
//         li.value.style.color = '#1d7dfa';
//         li.value.children[0].src = `${runtimeConfig.app.baseURL}img/like-hover.png`;
//         flag = 1;
//       }
//     };
//     li.value.onmouseout = () => {
//       if (flag === 0) {
//         li.value.style.color = '#4e5969';
//         li.value.children[0].src = `${runtimeConfig.app.baseURL}img/like.png`;
//         flag = 1;
//       }
//     };
//     li.value.onclick = () => {
//       if (flag === 1) {
//         msgInfo.like++;
//         li.value.style.color = '#1d7dfa';
//         li.value.children[0].src = `${runtimeConfig.app.baseURL}img/like-active.png`;
//       }
//       flag = 2;
//     };
//   });
// });

let isCenterDialog = ref(false);
let isShowSelector = ref(false);
let checkTagGroup = ref<Array<string>>([]);
let shieldTagBtnDisabled = ref(true);
let isShowForm = ref(false);

// 展示表单
function showForm() {
  isShowForm.value = true;
  // console.log(isShowForm);
}

// 屏蔽标签
function shieldTag() {
  // 发送请求
  ElMessage({
    message: '不再推荐相关标签内容',
    type: 'success',
  });
}

// 获取屏蔽按钮样式
function getShieldBtnClass(): Array<string> {
  let classArr: Array<string> = ['btn-confirm'];
  if (checkTagGroup.value?.length !== 0) {
    classArr.push('btn-confirm__able');
    shieldTagBtnDisabled.value = false;
  } else {
    shieldTagBtnDisabled.value = true;
  }
  return classArr;
}

// 获取屏蔽tag选项样式
function getOptionClass(): Array<string> {
  let classArr: Array<string> = ['option'];
  // if (this.checkTagGroup.indexOf(item) !== -1) {
  //   classArr.push('option-check');
  // }
  return classArr;
}

// 屏蔽作者
function shieldAuthor() {
  isCenterDialog.value = false;
  // 发送请求
  ElMessage({
    message: '将不再推荐该作者文章',
    type: 'success',
  });
}

// 不感兴趣
function dislike() {
  ElMessage({
    message: '将减少类似内容推荐',
    type: 'success',
  });
  // 发送请求
}

// 点赞
async function like(id: number) {
  // console.log(id);

  let param = {
    id: id,
  };
  if (isLiked.value) {
    // 取消点赞
    PropsRef.msgInfo.like--;
    isLiked.value = false;
  } else {
    await likeMessage(param).then((res) => {
      // 成功 点赞加一
      PropsRef.msgInfo.like++;
      isLiked.value = true;
    });
  }

  // if (data.value) {
  // }
}

// 获取文章盒子样式
function getClass(): Array<string> {
  let classArr: Array<string> = [];
  if (props.msgInfo.isArticle !== false) {
    classArr.push('entry');
  }
  return classArr;
}

function getLikeClass() {
  console.log();
}
function toArticle() {
  const router = useRouter();
  router.push(`/article/${msgInfo.id}`);
}
</script>
<style scoped lang="less">
:deep(.el-checkbox__input) {
  display: none;
}

:deep(.el-checkbox__label) {
  padding: 0;
}

.author-message,
.tag,
.message {
  font-size: 13px;
  color: var(--theme-artlist-user);
  line-height: 22px;
}

/* 外容器 */
.outer {
  background: var(--theme-main-base);
}

.container {
  position: relative;
  min-width: 220px;
  cursor: pointer;
}

.entry:hover {
  background: var(--theme-artlist-hover);
}

/* 外容器hover状态下的关闭图标 */
.entry:hover .container-delete2 {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

/* meta容器 */
.meta-container {
  display: inline-flex;
  align-items: center;
  color: #86909c;
}

/* 作者信息样式 */
.author-message {
  overflow: hidden;
  margin-right: 8px;
  min-width: 0;
  max-width: 150px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.author-message:hover {
  color: #1d7dfa;
}

/* 时间样式 */
.time {
  padding: 0 10px;
  line-height: 22px;
  font-size: 13px;
  border: 1px solid #e5e6eb;
  border-top: 0;
  border-bottom: 0;
}

/* 标签列表 */
.tag-list {
  display: flex;
  align-items: center;
}

/* 标签样式 */
.tag {
  padding: 0 8px;
}

.tag:hover {
  color: #1d7dfa;
}

/* 广告 */
.tag-ad {
  position: absolute;
  top: 8px;
  right: 0;
  width: 40px;
  font-size: 13px;
  text-align: center;
  color: #cdd1d7;
  border: 1px solid #cdd1d7;
  border-radius: 2px;
  line-height: 16px;
}

.point::after {
  content: '·';
}

/* 文章内容容器 */
.content-container {
  display: flex;
  padding-bottom: 12px;
  margin-top: 10px;
  border-bottom: 1px solid rgb(228 230 235 / 50%);
}

/* 主体文本 */
.content-text {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

/* 图片 */
.img {
  margin-left: 24px;
  width: 120px;
  height: 80px;
  background: #86909c;
}

/* 标题盒子 */
.title-box {
  margin-bottom: 8px;
}

/* 标题 */
.title {
  font-size: 16px;
  color: var(--theme-artlist-title);
  font-weight: 700;
  line-height: 24px;
}

/* 标题文本 */
.title-text,
.message {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message {
  margin-bottom: 10px;
}

/* 行动列表 */
.action-list {
  display: flex;
}

.action-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  height: 20px;
  font-size: 13px;
  color: var(--theme-artlist-stat);
}

.icon-views {
  fill: var(--theme-artlist-stat);
}

.icon-likes {
  fill: var(--theme-artlist-stat);
}

.liked {
  span {
    color: var(--theme-main-color);
  }

  .icon-likes {
    fill: var(--theme-main-color);
  }
}

.likes {
  &:hover {
    span {
      color: var(--theme-main-color);
      transition: all 0.2s linear;
    }

    .icon-likes {
      transition: all 0.2s linear;
      fill: var(--theme-main-color);
    }
  }
}

span i {
  position: absolute;
  top: 0;
}

/* 删除图标的容器 */
.container-delete2 {
  position: absolute;
  top: 8px;
  right: 0;
  z-index: 999;
  display: none;
}

.icon-delete::before {
  color: #c9cdd4;
}

.container-delete2:hover .icon-delete::before {
  color: #1e80ff;
}

.container-delete2:hover .dropdown-menu2 {
  display: block;
}

.icon-delete {
  margin-bottom: 2px;
}

/* 下拉菜单主体 */
.dropdown-menu2 {
  display: none;
  background: #fff;
  border-radius: 3px;
}

.dropdown-menu2-item {
  display: flex;
  align-items: center;
  width: 220px;
  font-size: 14px;
  line-height: 34px;
  color: #252933;
}

.dropdown-menu2-item:hover {
  background: #f7f8fa;
}

.img2 {
  margin: 0 5px;
  width: 16px;
  height: 16px;
}

.img3 {
  margin-left: 110px;
  width: 20px;
  height: 20px;
}

/* 对话框body */
.dialog-body {
  margin: -30px -4px;
}

.p1,
.p2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 16px;
  color: #515767;
  line-height: 28px;
}

.username {
  overflow: hidden;
  padding: 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ff7426;
  word-break: break-all;
}

/* 对话框footer */
.dialog-footer {
  display: flex;
  justify-content: space-around;
  margin: 22px -4px 4px;
}

.btn-cancel,
.btn-confirm {
  width: 120px;
  height: 40px;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  line-height: 40px;
  cursor: pointer;
}

/* 取消屏蔽作者按钮 */
.btn-cancel {
  color: #1e80ff;
  background: #fff;
  border: 1px solid #1e80ff;
}

/* 确认屏蔽作者按钮 */
.dialog-footer .btn-confirm {
  color: #fff;
  background: #1e80ff;
}

.dialog-footer .btn-confirm:hover {
  background: #1171ee;
}

.selector {
  padding: 5px 12px 10px;
  width: 220px;
  height: 85px;
}

.select-area {
  display: flex;
}

.option {
  padding: 5px 8px !important;
  margin-right: 7px;
  color: #5e6473;
  background: #f7f8fa;
  border: 1px solid #fff;
  border-radius: 4px !important;
}

.option:active {
  color: #2b87ff;
  background: #f4f9ff;
  border: 1px solid #b3d5ff;
}

.selector .btn-confirm {
  margin-top: 12px;
  width: 196px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #1171ee;
  line-height: 30px;
  opacity: 0.6;
  cursor: not-allowed;
}

.selector .btn-confirm__able {
  opacity: 1;
  cursor: pointer;
}

@media screen and (max-width: 960px) {
  .container-delete2 {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
