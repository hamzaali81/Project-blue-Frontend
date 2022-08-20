import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Avatar from 'react-avatar-edit'
import { connect } from 'react-redux'
import { notification, Input, Button, Form, Checkbox, Select } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({ user, dispatch })

const Register = ({ dispatch, user }) => {
  const [stepForRegister, setStepForRegister] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const onAvatarClose = () => {
    setAvatarPreview(null);
  }

  const onAvatarCrop = (preview) => {
    setAvatarPreview(preview);
  }

  const onAvatarBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  const onFinish = values => {
    setFormValues({ ...formValues, ...values })
    if (stepForRegister === 3) {
      if (avatarPreview === null) {
        notification.error({
          message: 'Avatar image',
          description: 'please choose your avatar image',
        })
        return;
      }
      formValues.avatar = avatarPreview;
      console.log(formValues);
      dispatch({
        type: 'user/REGISTER',
        payload: formValues,
      })
    }
    if (stepForRegister === 1 && values.password !== values.confirmPassword) {
      notification.error({
        message: 'Password dismatch',
        description: 'please confirm the password again',
      })
      return;
    }
    setStepForRegister(stepForRegister + 1);
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-32 mb-3">Create your account</div>
        <div className="mb-4">
          {
            stepForRegister === 1 &&
            <p>
              please input your credentials in the below fields
            </p>
          }
          {
            stepForRegister === 2 &&
            <p>
              please input address info of yours and select the language you like
            </p>
          }
          {
            stepForRegister === 3 &&
            <p>
              please choose your avatar image
            </p>
          }
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          {
            stepForRegister === 1 &&
            <>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your user name' }]}
              >
                <Input size="large" placeholder="User Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your e-mail address' }]}
              >
                <Input size="large" placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input your confirm password' }]}
              >
                <Input.Password size="large" placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>I agree to receive promotions</Checkbox>
              </Form.Item>
            </>
          }
          {
            stepForRegister === 2 &&
            <>
              <Form.Item name="phoneNumber">
                <PhoneInput
                  className="font-size-18"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber} />
              </Form.Item>
              <Form.Item
                name="zipcode"
                rules={[{ required: true, message: 'Please input your zip code' }]}
              >
                <Input size="large" placeholder="Zip code" />
              </Form.Item>
              <Form.Item name="language">
                <Select size="large" placeholder="Choose preferred language">
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="jp">Japanese</Select.Option>
                  <Select.Option value="zh">Chinese</Select.Option>
                  <Select.Option value="ko">Korean</Select.Option>
                </Select>
              </Form.Item>
            </>
          }
          {
            stepForRegister === 3 &&
            <>
              <Form.Item
                name="avatar"
              >
                <Avatar
                  height={295}
                  onCrop={onAvatarCrop}
                  onClose={onAvatarClose}
                  onBeforeFileLoad={onAvatarBeforeFileLoad}
                  src={avatarSrc}
                />
                {
                  avatarPreview && <div className="text-center mt-2"><img src={avatarPreview} alt="Preview" /></div>
                }
              </Form.Item>
            </>
          }
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-center w-100"
            loading={user.loading}
          >
            <strong>{stepForRegister === 3 ? "Sign up" : "Next"}</strong>
          </Button>
        </Form>
        <div>
          <span className="mr-1">By signing up, you agree to the</span>
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Already have an account?</span>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Register)
