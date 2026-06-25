import { Meta, StoryObj } from '@storybook/react';
import { MultiStepForm } from './multi-step-form';

const meta: Meta<typeof MultiStepForm> = {
  title: 'Blocks/MultiStepForm',
  component: MultiStepForm,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof MultiStepForm>;

const mockSteps = [
  {
    title: '个人信息',
    description: '请填写您的基本信息',
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'text' as const,
        placeholder: '请输入姓名',
        required: true,
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email' as const,
        placeholder: '请输入邮箱',
        required: true,
      },
      {
        name: 'phone',
        label: '手机号',
        type: 'tel' as const,
        placeholder: '请输入手机号',
      },
    ],
  },
  {
    title: '账户信息',
    description: '设置您的账户',
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'text' as const,
        placeholder: '4-16 位字母或数字',
        required: true,
      },
      {
        name: 'password',
        label: '密码',
        type: 'password' as const,
        placeholder: '至少 8 位',
        required: true,
      },
    ],
  },
  {
    title: '偏好设置',
    description: '选择您的偏好',
    fields: [
      {
        name: 'role',
        label: '角色',
        type: 'select' as const,
        options: [
          { label: '开发者', value: 'developer' },
          { label: '设计师', value: 'designer' },
          { label: '产品经理', value: 'pm' },
        ],
      },
      {
        name: 'agree',
        label: '我同意服务条款和隐私政策',
        type: 'checkbox' as const,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    steps: mockSteps,
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
    },
    prefersReducedMotion: true,
  },
};
