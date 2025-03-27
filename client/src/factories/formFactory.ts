import React from 'react';
import { z } from 'zod';

export type FieldType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'time'
  | 'file'
  | 'hidden';

export interface FormFieldFactoryProps {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  multiple?: boolean;
  accept?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  validation?: z.ZodTypeAny;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export interface FormFactoryProps {
  id: string;
  title?: string;
  description?: string;
  fields: FormFieldFactoryProps[];
  submitLabel: string;
  cancelLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  showCancel?: boolean;
  layout?: 'vertical' | 'horizontal' | 'inline';
  columns?: 1 | 2 | 3;
  successMessage?: string;
  errorMessage?: string;
  apiEndpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  redirectUrl?: string;
  showSuccessModal?: boolean;
  showErrorModal?: boolean;
}

export function createFormField(props: FormFieldFactoryProps) {
  return {
    ...props,
    isRequired: !!props.required,
    isDisabled: !!props.disabled,
    isReadOnly: !!props.readOnly,
    hasOptions: ['select', 'multiselect', 'radio', 'checkbox'].includes(props.type) && props.options && props.options.length > 0,
    hasIcon: !!props.icon,
    hasHelperText: !!props.helperText,
    getInputType: () => {
      // Map field type to HTML input type
      switch (props.type) {
        case 'email': return 'email';
        case 'password': return 'password';
        case 'number': return 'number';
        case 'tel': return 'tel';
        case 'url': return 'url';
        case 'checkbox': return 'checkbox';
        case 'radio': return 'radio';
        case 'date': return 'date';
        case 'time': return 'time';
        case 'file': return 'file';
        case 'hidden': return 'hidden';
        default: return 'text';
      }
    },
    getValidationSchema: () => {
      if (props.validation) return props.validation;
      
      // Create basic validation based on field props
      let schema = z.any();
      
      switch (props.type) {
        case 'email':
          schema = z.string().email('Please enter a valid email address');
          break;
        case 'url':
          schema = z.string().url('Please enter a valid URL');
          break;
        case 'number':
          schema = z.coerce.number().finite('Please enter a valid number');
          if (typeof props.min === 'number') schema = schema.min(props.min, `Minimum value is ${props.min}`);
          if (typeof props.max === 'number') schema = schema.max(props.max, `Maximum value is ${props.max}`);
          break;
        case 'tel':
          schema = z.string().regex(/^\+?[0-9\s-()]+$/, 'Please enter a valid phone number');
          break;
        default:
          schema = z.string();
          if (typeof props.minLength === 'number') schema = schema.min(props.minLength, `Minimum ${props.minLength} characters required`);
          if (typeof props.maxLength === 'number') schema = schema.max(props.maxLength, `Maximum ${props.maxLength} characters allowed`);
          if (props.pattern) schema = schema.regex(new RegExp(props.pattern), 'Invalid format');
          break;
      }
      
      // Add required validation
      if (props.required) {
        schema = schema.refine(val => {
          if (typeof val === 'string') return val.trim().length > 0;
          return val !== undefined && val !== null;
        }, 'This field is required');
      } else {
        schema = schema.optional();
      }
      
      return schema;
    }
  };
}

export function createForm(props: FormFactoryProps) {
  const formFields = props.fields.map(field => createFormField(field));
  
  return {
    ...props,
    fields: formFields,
    hasTitle: !!props.title,
    hasDescription: !!props.description,
    hasCancel: !!props.showCancel && !!props.cancelLabel,
    hasReset: !!props.showReset && !!props.resetLabel,
    hasRedirect: !!props.redirectUrl,
    hasSuccessModal: !!props.showSuccessModal,
    hasErrorModal: !!props.showErrorModal,
    isApiForm: !!props.apiEndpoint,
    getValidationSchema: () => {
      const schema: Record<string, z.ZodTypeAny> = {};
      
      formFields.forEach(field => {
        if (field.name) {
          schema[field.name] = field.getValidationSchema();
        }
      });
      
      return z.object(schema);
    },
    getDefaultValues: () => {
      const defaultValues: Record<string, any> = {};
      
      formFields.forEach(field => {
        if (field.name) {
          defaultValues[field.name] = field.defaultValue ?? (
            field.type === 'checkbox' ? false : 
            field.type === 'number' ? 0 : 
            ''
          );
        }
      });
      
      return defaultValues;
    },
    getColumnsClass: () => {
      switch (props.columns) {
        case 3: return 'grid-cols-1 md:grid-cols-3 gap-4';
        case 2: return 'grid-cols-1 md:grid-cols-2 gap-4';
        default: return 'space-y-4';
      }
    },
    getLayoutClass: () => {
      switch (props.layout) {
        case 'horizontal': return 'sm:flex sm:items-start space-y-0 space-x-4';
        case 'inline': return 'flex flex-wrap items-center gap-4';
        default: return 'space-y-4';
      }
    },
    getRequiredFields: () => {
      return formFields.filter(field => field.isRequired);
    },
    getFieldGroups: () => {
      // Group fields logically (e.g., personal info, address, etc.)
      // This is a simple implementation - in a real app you'd have more sophisticated grouping
      const groups: Record<string, FormFieldFactoryProps[]> = {
        'default': []
      };
      
      formFields.forEach(field => {
        const groupId = field.id.split('.')[0] || 'default';
        if (!groups[groupId]) groups[groupId] = [];
        groups[groupId].push(field);
      });
      
      return Object.entries(groups).map(([key, fields]) => ({
        id: key,
        fields
      }));
    }
  };
}