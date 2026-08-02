"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Car } from "@/core/types/car.type";
import { formatCurrencyTHB } from "@/core/utils/format.util";
import { deleteCarAction } from "@/features/cars/car.action";
import { Button } from "@/core/components/button.component";
import { Badge } from "@/core/components/badge.component";
import { ConfirmDialog } from "@/core/components/confirm-dialog.component";
import { EmptyState } from "@/core/components/empty-state.component";
import { AdminCarFormModal } from "@/features/cars/admin-car-form-modal.component";

interface AdminCarTableProps {
  cars: Car[];
}

export function AdminCarTable({ cars }: AdminCarTableProps) {
  const router = useRouter();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreateModal() {
    setEditingCar(null);
    setFormModalOpen(true);
  }

  function openEditModal(car: Car) {
    setEditingCar(car);
    setFormModalOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteCarAction(deleteTarget._id);
    setDeleting(false);
    setDeleteTarget(null);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button testId="admin-add-car-button" onClick={openCreateModal}>
          <Plus className="size-4" aria-hidden="true" />
          Add Car
        </Button>
      </div>

      {cars.length === 0 ? (
        <EmptyState title="No cars yet" description="Add your first car to the fleet." testId="admin-cars-empty-state" />
      ) : (
        <div className="overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[720px] text-left text-sm" data-testid="admin-cars-table">
            <thead className="border-b border-border bg-surface text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium">Price/day</th>
                <th className="p-3 font-medium">Seats</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} data-testid={`admin-car-row-${car._id}`} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <p className="font-medium text-foreground">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-muted-foreground">{car.licensePlate}</p>
                  </td>
                  <td className="p-3">{formatCurrencyTHB(car.pricePerDay)}</td>
                  <td className="p-3">{car.seats}</td>
                  <td className="p-3">
                    <Badge color={car.available ? "emerald" : "neutral"}>{car.available ? "Available" : "Unavailable"}</Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        testId={`admin-car-${car._id}-edit-button`}
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(car)}
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </Button>
                      <Button
                        testId={`admin-car-${car._id}-delete-button`}
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(car)}
                      >
                        <Trash2 className="size-4 text-red-500" aria-hidden="true" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminCarFormModal
        open={formModalOpen}
        car={editingCar}
        onClose={() => setFormModalOpen(false)}
        onSaved={() => router.refresh()}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete car"
        message={`Delete ${deleteTarget?.brand} ${deleteTarget?.model}? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        testId="delete-car-confirm-dialog"
      />
    </div>
  );
}
