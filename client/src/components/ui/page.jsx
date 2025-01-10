'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios';
import { useRouter } from 'next/navigation';



const validationSchema = Yup.object({
  user_name: Yup.string().required('Username is required').trim(),
  email: Yup.string().email('Invalid email address').required('Email is required').lowercase(),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  phone_number: Yup.string().required('Phone number is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip_code: Yup.string().required('ZIP code is required'),
    country: Yup.string().required('Country is required')
  }),
  preferences: Yup.object({
    newsletter_subscribed: Yup.boolean(),
    preferred_style: Yup.string().required('Please select a preferred style')
  })
});

const handleRegister=(values) => {
  axios.post('http://localhost:9000/register',values)
}
export default function RegisterPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      user_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: ''
      },
      preferences: {
        newsletter_subscribed: false,
        preferred_style: ''
      }
    },
    validationSchema,
    onSubmit: (values) => {
      handleRegister(values)
    },
  });

  return (
    (<div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Fashion
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account and start shopping in style
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="user_name">Username</Label>
              <Input
                id="user_name"
                name="user_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_name}
                className="mt-1" />
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.user_name}</div>
              ) : null}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1" />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="mt-1" />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                className="mt-1" />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phone_number}</div>
              ) : null}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <div>
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.street}
                  className="mt-1" />
                {formik.touched.address?.street && formik.errors.address?.street ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.street}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.city}
                  className="mt-1" />
                {formik.touched.address?.city && formik.errors.address?.city ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.city}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.state}
                  className="mt-1" />
                {formik.touched.address?.state && formik.errors.address?.state ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.state}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="address.zip_code">ZIP Code</Label>
                <Input
                  id="address.zip_code"
                  name="address.zip_code"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.zip_code}
                  className="mt-1" />
                {formik.touched.address?.zip_code && formik.errors.address?.zip_code ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.zip_code}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.country}
                  className="mt-1" />
                {formik.touched.address?.country && formik.errors.address?.country ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.country}</div>
                ) : null}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="preferences.newsletter_subscribed"
                  name="preferences.newsletter_subscribed"
                  checked={formik.values.preferences.newsletter_subscribed}
                  onCheckedChange={(checked) => formik.setFieldValue('preferences.newsletter_subscribed', checked)} />
                <Label htmlFor="preferences.newsletter_subscribed">Subscribe to FAsion newsletter</Label>
              </div>

              <div>
                <Label htmlFor="preferences.preferred_style">Preferred Style</Label>
                <Select
                  name="preferences.preferred_style"
                  value={formik.values.preferences.preferred_style}
                  onValueChange={(value) => formik.setFieldValue('preferences.preferred_style', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="streetwear">Streetwear</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.preferences?.preferred_style && formik.errors.preferences?.preferred_style ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.preferences.preferred_style}</div>
                ) : null}
              </div>
            </div>

            <Button type="submit" className="w-full">Create Account</Button>
        

            
          </form>
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/login')}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>)
  );
}

