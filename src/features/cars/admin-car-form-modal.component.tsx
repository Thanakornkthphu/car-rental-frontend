"use client";

import { useState } from "react";
import type { Car, CarFormInput } from "@/core/types/car.type";
import { TRANSMISSION_OPTIONS, FUEL_TYPE_OPTIONS, MIN_CAR_SEATS } from "@/features/cars/car.constant";
import { createCarAction, updateCarAction } from "@/features/cars/car.action";
import { Modal } from "@/core/components/modal.component";
import { Input } from "@/core/components/input.component";
import { Select } from "@/core/components/select.component";
import { Button } from "@/core/components/button.component";

const EMPTY_FORM: CarFormInput = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  licensePlate: "",
  pricePerDay: 0,
  color: "",
  seats: MIN_CAR_SEATS,
  transmission: "auto",
  fuelType: "petrol",
  available: true,
};

interface AdminCarFormModalProps {
  open: boolean;
  car: Car | null;
  onClose: () => void;
  onSaved: () => void;
}

export function AdminCarFormModal({ open, car, onClose, onSaved }: AdminCarFormModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={car ? "Edit car" : "Add car"} testId="admin-car-form-modal">
      {open && <CarFormFields car={car} onClose={onClose} onSaved={onSaved} />}
    </Modal>
  );
}

interface CarFormFieldsProps {
  car: Car | null;
  onClose: () => void;
  onSaved: () => void;
}

function CarFormFields({ car, onClose, onSaved }: CarFormFieldsProps) {
  const [form, setForm] = useState<CarFormInput>(() => (car ? { ...car } : EMPTY_FORM));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof CarFormInput>(key: K, value: CarFormInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const result = car ? await updateCarAction(car._id, form) : await createCarAction(form);
    setSaving(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} data-testid="admin-car-form" className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Brand"
          testId="admin-car-brand-input"
          value={form.brand}
          onChange={(event) => updateField("brand", event.target.value)}
          required
        />
        <Input
          label="Model"
          testId="admin-car-model-input"
          value={form.model}
          onChange={(event) => updateField("model", event.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          type="number"
          testId="admin-car-year-input"
          value={form.year}
          onChange={(event) => updateField("year", Number(event.target.value))}
          required
        />
        <Input
          label="License plate"
          testId="admin-car-license-plate-input"
          value={form.licensePlate}
          onChange={(event) => updateField("licensePlate", event.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Price per day (THB)"
          type="number"
          min={0}
          testId="admin-car-price-input"
          value={form.pricePerDay}
          onChange={(event) => updateField("pricePerDay", Number(event.target.value))}
          required
        />
        <Input
          label="Color"
          testId="admin-car-color-input"
          value={form.color}
          onChange={(event) => updateField("color", event.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Seats"
          type="number"
          min={MIN_CAR_SEATS}
          testId="admin-car-seats-input"
          value={form.seats}
          onChange={(event) => updateField("seats", Number(event.target.value))}
          required
        />
        <Select
          label="Transmission"
          testId="admin-car-transmission-select"
          options={TRANSMISSION_OPTIONS}
          value={form.transmission}
          onChange={(event) => updateField("transmission", event.target.value as CarFormInput["transmission"])}
        />
      </div>
      <Select
        label="Fuel type"
        testId="admin-car-fuel-type-select"
        options={FUEL_TYPE_OPTIONS}
        value={form.fuelType}
        onChange={(event) => updateField("fuelType", event.target.value as CarFormInput["fuelType"])}
      />
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          data-testid="admin-car-available-checkbox"
          checked={form.available}
          onChange={(event) => updateField("available", event.target.checked)}
          className="size-4 rounded border-border"
        />
        Available for booking
      </label>
      {error && (
        <p className="text-sm text-red-500" data-testid="admin-car-form-error">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button testId="admin-car-form-cancel-button" type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button testId="admin-car-form-submit-button" type="submit" loading={saving}>
          {car ? "Save changes" : "Add car"}
        </Button>
      </div>
    </form>
  );
}
