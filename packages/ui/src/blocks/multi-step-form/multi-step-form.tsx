'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

// ─── Types ───────────────────────────────────────────────

export interface FormField {
  /** 字段名 */
  name: string;
  /** 标签 */
  label: string;
  /** 输入类型 */
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox';
  /** 占位符 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 验证正则 */
  pattern?: string;
  /** 验证错误消息 */
  errorMessage?: string;
  /** 选项（select 类型使用） */
  options?: { label: string; value: string }[];
}

export interface FormStep {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 步骤图标（可选） */
  icon?: React.ReactNode;
  /** 字段列表 */
  fields: FormField[];
}

export interface MultiStepFormProps {
  /** 步骤列表 */
  steps: FormStep[];
  /** 提交回调 */
  onSubmit: (data: Record<string, string>) => void;
  /** 提交按钮文本 */
  submitLabel?: string;
  /** 下一步文本 */
  nextLabel?: string;
  /** 上一步文本 */
  backLabel?: string;
  /** 自定义类名 */
  className?: string;
  /** 测试用：跳过动效 */
  prefersReducedMotion?: boolean;
}

// ─── Step Indicator ──────────────────────────────────────

function StepIndicator({
  steps,
  currentStep,
}: {
  steps: FormStep[];
  currentStep: number;
}) {
  return (
    <nav aria-label="表单步骤" className="mb-10">
      <ol className="flex items-center justify-center gap-2">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isLast = i === steps.length - 1;

          return (
            <li key={step.title} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                    isCompleted &&
                      'bg-[var(--color-accent)] text-[var(--color-bg-primary)]',
                    isActive &&
                      'border-2 border-[var(--color-accent)] text-[var(--color-accent)]',
                    !isActive &&
                      !isCompleted &&
                      'border border-[var(--color-border-default)] text-[var(--color-text-muted)]'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? '✓' : i + 1}
                </motion.div>
                <span
                  className={cn(
                    'hidden sm:inline text-sm',
                    isActive && 'text-[var(--color-text-primary)] font-medium',
                    !isActive && 'text-[var(--color-text-muted)]'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'h-px w-8 sm:w-12',
                    isCompleted
                      ? 'bg-[var(--color-accent)]'
                      : 'bg-[var(--color-border-default)]'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Field Renderer ──────────────────────────────────────

function FormFieldRenderer({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const inputId = `field-${field.name}`;

  const baseInputClass = cn(
    'w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200',
    'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
    'border-[var(--color-border-default)]',
    'hover:border-[var(--color-accent)]/50',
    'focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]',
    error &&
      'border-[var(--color-warning)] focus:border-[var(--color-warning)] focus:ring-[var(--color-warning)]/30'
  );

  if (field.type === 'textarea') {
    return (
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
        className={cn(baseInputClass, 'resize-y min-h-[100px]')}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={!!error}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        required={field.required}
        className={cn(baseInputClass, 'appearance-none')}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={!!error}
      >
        <option value="">请选择</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) =>
            onChange(field.name, e.target.checked ? 'true' : 'false')
          }
          className="h-4 w-4 rounded border-[var(--color-border-default)] text-[var(--color-accent)]
            focus:ring-[var(--color-focus-ring)] focus:ring-2"
        />
        <span className="text-sm text-[var(--color-text-muted)]">
          {field.label}
        </span>
      </label>
    );
  }

  return (
    <input
      id={inputId}
      type={field.type || 'text'}
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
      placeholder={field.placeholder}
      required={field.required}
      pattern={field.pattern}
      className={baseInputClass}
      aria-describedby={error ? `${inputId}-error` : undefined}
      aria-invalid={!!error}
    />
  );
}

// ─── Component ───────────────────────────────────────────

export function MultiStepForm({
  steps,
  onSubmit,
  submitLabel = '提交',
  nextLabel = '下一步',
  backLabel = '上一步',
  className,
  prefersReducedMotion = false,
}: MultiStepFormProps) {
  const shouldReduce = useReducedMotion() || prefersReducedMotion;
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const updateField = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除对应错误
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const step = steps[stepIndex];
      const newErrors: Record<string, string> = {};

      step.fields.forEach((field) => {
        const value = formData[field.name] || '';
        if (field.required && !value.trim()) {
          newErrors[field.name] =
            field.errorMessage || `${field.label} 不能为空`;
        }
        if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
          newErrors[field.name] =
            field.errorMessage || `${field.label} 格式不正确`;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [steps, formData]
  );

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, validateStep, steps.length]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, validateStep, onSubmit, formData]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-20',
          className
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)]/20 mb-6"
        >
          <span className="text-2xl text-[var(--color-success)]">✓</span>
        </motion.div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          提交成功！
        </h3>
        <p className="mt-2 text-[var(--color-text-muted)]">
          感谢您的提交，我们将尽快处理。
        </p>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className={cn('mx-auto max-w-2xl', className)}>
      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        prefersReducedMotion={shouldReduce}
      />

      {/* Step Content */}
      {shouldReduce ? (
        <div key={currentStep}>
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold font-display text-[var(--color-text-primary)]">
              {currentStepData.title}
            </h3>
            {currentStepData.description && (
              <p className="mt-2 text-[var(--color-text-muted)]">
                {currentStepData.description}
              </p>
            )}
          </div>
          <div className="space-y-5">
            {currentStepData.fields.map((field) => (
              <div key={field.name}>
                {field.type !== 'checkbox' && (
                  <label
                    htmlFor={`field-${field.name}`}
                    className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-[var(--color-warning)]">
                        *
                      </span>
                    )}
                  </label>
                )}
                <FormFieldRenderer
                  field={field}
                  value={formData[field.name] || ''}
                  error={errors[field.name]}
                  onChange={updateField}
                />
                {errors[field.name] && (
                  <p
                    id={`field-${field.name}-error`}
                    className="mt-1 text-xs text-[var(--color-warning)]"
                    role="alert"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold font-display text-[var(--color-text-primary)]">
                {currentStepData.title}
              </h3>
              {currentStepData.description && (
                <p className="mt-2 text-[var(--color-text-muted)]">
                  {currentStepData.description}
                </p>
              )}
            </div>
            <div className="space-y-5">
              {currentStepData.fields.map((field) => (
                <div key={field.name}>
                  {field.type !== 'checkbox' && (
                    <label
                      htmlFor={`field-${field.name}`}
                      className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-[var(--color-warning)]">
                          *
                        </span>
                      )}
                    </label>
                  )}
                  <FormFieldRenderer
                    field={field}
                    value={formData[field.name] || ''}
                    error={errors[field.name]}
                    onChange={updateField}
                  />
                  {errors[field.name] && (
                    <p
                      id={`field-${field.name}-error`}
                      className="mt-1 text-xs text-[var(--color-warning)]"
                      role="alert"
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Buttons */}
      <div className="mt-10 flex items-center justify-between">
        <div>
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="rounded-xl px-6 py-3 text-sm font-medium
                text-[var(--color-text-muted)] border border-[var(--color-border-default)]
                hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {backLabel}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-subtle)]">
            {currentStep + 1} / {steps.length}
          </span>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="rounded-xl px-8 py-3 text-sm font-semibold
                bg-[var(--color-accent)] text-[var(--color-bg-primary)]
                hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]
                active:scale-[0.98] transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {nextLabel}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-xl px-8 py-3 text-sm font-semibold
                bg-[var(--color-success)] text-[var(--color-bg-primary)]
                hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]
                active:scale-[0.98] transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-success)]/50"
            >
              {isSubmitting ? '提交中...' : submitLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
