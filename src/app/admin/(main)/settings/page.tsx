'use client'
import React, { useState } from 'react'

export default function SettingsPage() {
  // Using dummy data instead of store
  const dummySettings = {
    shippingCost: 100,
    freeShippingThreshold: 1000,
  }

  const [localSettings, setLocalSettings] = useState<{
    shippingCost: number | null
    freeShippingThreshold: number | null
  }>(dummySettings)

  const handleSettingChange =
    (key: keyof typeof localSettings) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      // Allow empty string or valid numbers
      if (value === '' || !isNaN(Number(value))) {
        setLocalSettings((prev) => ({
          ...prev,
          [key]: value === '' ? null : Number(value),
        }))
      }
    }

  const saveSettings = () => {
    console.log('Saving settings:', {
      shippingCost: localSettings.shippingCost ?? 0,
      freeShippingThreshold: localSettings.freeShippingThreshold ?? 0,
    })
    // Save to database logic would go here
  }

  return (
    <div className="max-w-md p-4">
      <h1 className="my-4 text-4xl font-semibold">Settings</h1>
      <div className="mt-8 mb-4">
        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="shipping-cost"
        >
          Shipping Cost (in Rs.)
        </label>
        <input
          id="shipping-cost"
          type="number"
          value={
            localSettings.shippingCost === null
              ? ''
              : localSettings.shippingCost.toString()
          }
          onChange={handleSettingChange('shippingCost')}
          className="focus:border-Orange focus:ring-Orange w-full rounded border p-2 focus:ring-0 focus:ring-offset-0 focus:outline-hidden"
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="free-shipping-threshold"
        >
          Free Shipping Threshold (in Rs.)
        </label>
        <input
          id="free-shipping-threshold"
          type="number"
          value={
            localSettings.freeShippingThreshold === null
              ? ''
              : localSettings.freeShippingThreshold.toString()
          }
          onChange={handleSettingChange('freeShippingThreshold')}
          className="focus:border-Orange focus:ring-Orange w-full rounded border p-2 focus:ring-0 focus:ring-offset-0 focus:outline-hidden"
        />
      </div>
      <button
        onClick={saveSettings}
        className="hover:text-Orange mt-4 w-32 rounded-xl bg-white py-2 text-nowrap shadow-md transition-colors"
      >
        Save Settings
      </button>
    </div>
  )
}
