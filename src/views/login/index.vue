<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="text" />
      </el-form-item>
      <el-form-item label="密  码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>();
const store = useStore();
const router = useRouter();

const ruleForm = reactive({
  username: "",
  password: "",
  loading: false,
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  ruleForm.loading = true;
  formEl.validate((valid) => {
    if (valid) {
      const res = store
        .dispatch("user/Login", {
          username: ruleForm.username,
          password: ruleForm.password,
        })
        .then((res) => {
          if (res.errCode === 0) {
            ruleForm.loading = false;
            router.push({ path: "/home" });
          } else {
            ElMessage({
              message: res.message,
              grouping: true,
              type: "error",
            });
          }
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
