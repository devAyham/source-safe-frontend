import { Col, Form, FormInstance, Input, Row } from "antd";
import { CustomFiled, Field } from "./interfaces/FormField.props";
import { hasControlRenderProp, hasRenderProp } from "./helpers/hasRenderProps";
import { EntityFormProps } from "./interfaces";
import { Button } from "../../atoms";
import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function EntityForm<
  SubmittedValues,
  createRequest,
  patchRequest,
  getResponse,
  extraData
>({
  initialValues,
  schema,
  onSubmit,
  formName,
  formProps,
  rowProps,
  actionButtonProps,
  actionName,
  extraData,
  getFormInstance,
}: EntityFormProps<
  SubmittedValues,
  createRequest,
  patchRequest,
  getResponse,
  extraData
>) {
  const { form } = formProps;
  const { t } = useTranslation();
  useEffect(() => {
    getFormInstance &&
      getFormInstance(form as FormInstance<SubmittedValues & extraData>);
  }, [form, getFormInstance]);
  const handleSubmit = async () => {
    try {
      const values = await form?.validateFields();
      await onSubmit(Object(values));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form<SubmittedValues & extraData>
      layout={"vertical"}
      initialValues={{
        ...initialValues,
      }}
      {...formProps}
      name={formName}
      form={form}
      onFinish={handleSubmit}
    >
      <Row {...rowProps}>
        {schema.map((field, index) => {
          let renderedField: JSX.Element;

          switch (true) {
            case hasControlRenderProp(field):
              //TODO - make interface
              const controlRenderField = field as CustomFiled<
                any,
                SubmittedValues,
                extraData
              >;
              renderedField = (
                <Col key={index} span={24} {...controlRenderField.grid}>
                  <Form.Item
                    {...controlRenderField}
                    key={String(controlRenderField.name)}
                    label={controlRenderField.label}
                    name={String(controlRenderField.name) as any}
                    rules={[
                      {
                        required: controlRenderField.required,
                        message: `${
                          React.isValidElement(controlRenderField.label)
                            ? (controlRenderField.label as ReactElement).props
                                .children
                            : controlRenderField.label
                        } ${t("IS_REQUIRED")}`,
                      },
                      ...(controlRenderField?.rules ?? []),
                    ]}
                    className={"label"}
                    initialValue={form?.getFieldValue(
                      String(controlRenderField.name)
                    )}
                  >
                    {controlRenderField.withControlRender?.({
                      ...initialValues,
                      ...(extraData as extraData),
                    })}
                  </Form.Item>
                </Col>
              );
              break;

            case hasRenderProp(
              field as CustomFiled<getResponse, SubmittedValues, extraData>
            ):
              const renderField = field as CustomFiled<
                any,
                SubmittedValues,
                extraData
              >;

              renderedField = (
                <Col key={index} span={24} {...renderField.grid}>
                  {renderField.render?.({
                    ...initialValues,
                    ...(extraData as extraData),
                  })}
                </Col>
              );

              break;

            default:
              const defaultField = field as Field<SubmittedValues>;
              renderedField = (
                <Col key={index} span={24} {...defaultField.grid}>
                  <Form.Item
                    {...defaultField}
                    key={String(defaultField.name)}
                    label={defaultField.label}
                    name={String(defaultField.name)  as any}
                    rules={[
                      {
                        required: defaultField.required,
                        message: `${
                          React.isValidElement(defaultField.label)
                            ? (defaultField.label as ReactElement).props
                                .children
                            : defaultField.label
                        } ${t("IS_REQUIRED")}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              );

              break;
          }

          return renderedField;
        })}
      </Row>
      {!formName && (
        <Form.Item>
          <Button {...actionButtonProps} htmlType="submit">
            {actionName ?? "save"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
