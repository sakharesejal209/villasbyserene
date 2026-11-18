"use client";

import { useEffect, useState } from "react";
import { Alert, Box, Divider } from "@mui/material";

import { httpService } from "@/app/@services";

import { AddToPoolStep } from "./AddToPoolStep";
import { SearchAndAssignStep } from "./SearchAndAssignStep";
import { CurrentImagesStep } from "./CurrentImagesStep";
import { AdminPropertyDetailDTO, AdminPropertyImageDTO, AdminUnitDTO, AdminUnitImageDTO, ImageCategory, ImageSelection, PoolImage } from "@/app/@types";
import { PropImageFlag, UnitImageFlag } from "@/app/@types/admin/dto/ImagesTabDTO";

interface Props {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const ImagesTab = ({ detail, propertyId, onSaved }: Props) => {
  // ── Notifications ─────────────────────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ── Step 1 — Add to pool ──────────────────────────────────────────────────
  const [categories, setCategories] = useState<ImageCategory[]>([]);
  const [newImg, setNewImg] = useState({
    image_url: "",
    image_alt: "",
    image_category_id: "",
  });
  const [adding, setAdding] = useState(false);

  // ── Step 2 — Search & assign ──────────────────────────────────────────────
  const [prefix, setPrefix] = useState("");
  const [poolImages, setPoolImages] = useState<PoolImage[]>([]);
  const [searching, setSearching] = useState(false);
  const [assignMode, setAssignMode] = useState<"property" | "unit">("property");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selections, setSelections] = useState<Map<string, ImageSelection>>(new Map());
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // ── Step 3 — Inline toggle saving ────────────────────────────────────────
  const [togglingImg, setTogglingImg] = useState<string | null>(null);
  const [propImageFlags, setPropImageFlags] = useState<Map<string, PropImageFlag>>(new Map());
  const [unitImageFlags, setUnitImageFlags] = useState<Map<string, UnitImageFlag>>(new Map());

  // ── Derived ───────────────────────────────────────────────────────────────
  const assignedPropIds = new Set(
    detail.images.map((pi: AdminPropertyImageDTO) => pi.image_id),
  );
  const assignedUnitIds = (uid: string) =>
    new Set(
      detail.units
        .find((u: AdminUnitDTO) => u.unit_id === uid)
        ?.images?.map((ui: AdminUnitImageDTO) => ui.image_id) ?? [],
    );

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    httpService<ImageCategory[]>()
      .get("/admin/properties/images/categories")
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setSelections(new Map());
  }, [assignMode, selectedUnit, deleteMode]);

  // ── Handlers — Step 1 ────────────────────────────────────────────────────

  const addToPool = async () => {
    if (!newImg.image_url || !newImg.image_alt) return;
    setAdding(true);
    try {
      const res = await httpService<PoolImage>().post(
        "/admin/properties/images/pool",
        {
          image_url: newImg.image_url,
          image_alt: newImg.image_alt,
          image_category_id: newImg.image_category_id ? +newImg.image_category_id : null,
        },
      );
      setPoolImages((prev) => [...prev.filter((i) => i.image_id !== res.image_id), res]);
      setNewImg({ image_url: "", image_alt: "", image_category_id: "" });
      setSuccess("Image added to pool");
    } catch {
      setError("Failed to add image");
    } finally {
      setAdding(false);
    }
  };

  // ── Handlers — Step 2 ────────────────────────────────────────────────────

  const searchPool = async () => {
    if (!prefix.trim()) return;
    setSearching(true);
    setSelections(new Map());
    try {
      const data = await httpService<PoolImage[]>().get(
        `/admin/properties/images/pool?prefix=${encodeURIComponent(prefix)}`,
      );
      setPoolImages(data);
    } catch {
      setError("Failed to search images");
    } finally {
      setSearching(false);
    }
  };

  const deleteFromPool = async (imageId: string) => {
    if (!confirm("Delete image from pool? This also removes all assignments.")) return;
    setRemoving(imageId);
    try {
      await httpService().delete(`/admin/properties/images/pool/${imageId}`);
      setPoolImages((prev) => prev.filter((i) => i.image_id !== imageId));
      setSelections((prev) => {
        const n = new Map(prev);
        n.delete(imageId);
        return n;
      });
      onSaved();
    } catch {
      setError("Failed to delete");
    } finally {
      setRemoving(null);
    }
  };

  const bulkDeleteFromPool = async () => {
    if (selections.size === 0) return;
    if (
      !confirm(
        `Delete ${selections.size} image${selections.size > 1 ? "s" : ""} from pool? This also removes all their assignments.`,
      )
    )
      return;
    setBulkDeleting(true);
    const ids = Array.from(selections.keys());
    const results = await Promise.allSettled(
      ids.map((id) => httpService().delete(`/admin/properties/images/pool/${id}`)),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    const succeeded = ids.filter((_, i) => results[i].status === "fulfilled");
    setPoolImages((prev) => prev.filter((img) => !succeeded.includes(img.image_id)));
    setSelections(new Map());
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to delete`);
    } else {
      setSuccess(`${succeeded.length} image${succeeded.length > 1 ? "s" : ""} deleted from pool`);
    }
    onSaved();
    setBulkDeleting(false);
  };

  const toggleSelect = (img: PoolImage) => {
    setSelections((prev) => {
      const n = new Map(prev);
      if (n.has(img.image_id)) {
        n.delete(img.image_id);
      } else {
        n.set(img.image_id, {
          image_id: img.image_id,
          is_banner_image: false,
          is_carousel_image: false,
          display_order: n.size,
        });
      }
      return n;
    });
  };

  const updateSelection = (imageId: string, patch: Partial<ImageSelection>) => {
    setSelections((prev) => {
      const n = new Map(prev);
      const cur = n.get(imageId);
      if (cur) n.set(imageId, { ...cur, ...patch });
      return n;
    });
  };

  const submitAssignments = async () => {
    if (selections.size === 0) {
      setError("No images selected");
      return;
    }
    if (assignMode === "unit" && !selectedUnit) {
      setError("Select a unit first");
      return;
    }
    setSubmitting(true);
    try {
      await Promise.all(
        Array.from(selections.values()).map((sel) =>
          assignMode === "property"
            ? httpService().post(`/admin/properties/${propertyId}/images/assign`, sel)
            : httpService().post(
                `/admin/properties/${propertyId}/units/${selectedUnit}/images/assign`,
                sel,
              ),
        ),
      );
      setSuccess(`${selections.size} image${selections.size > 1 ? "s" : ""} assigned`);
      setSelections(new Map());
      onSaved();
    } catch {
      setError("Failed to assign some images");
    } finally {
      setSubmitting(false);
    }
  };

  const unassignProp = async (imageId: string) => {
    setRemoving(imageId);
    try {
      await httpService().delete(
        `/admin/properties/${propertyId}/images/unassign/${imageId}`,
      );
      setSuccess("Removed");
      onSaved();
    } catch {
      setError("Failed to remove");
    } finally {
      setRemoving(null);
    }
  };

  const unassignUnit = async (imageId: string) => {
    if (!selectedUnit) return;
    setRemoving(imageId);
    try {
      await httpService().delete(
        `/admin/properties/${propertyId}/units/${selectedUnit}/images/unassign/${imageId}`,
      );
      setSuccess("Removed");
      onSaved();
    } catch {
      setError("Failed to remove");
    } finally {
      setRemoving(null);
    }
  };

  // ── Handlers — Step 3 (flag toggles) ─────────────────────────────────────

  const togglePropImageFlag = async (
    imageId: string,
    flag: "is_banner_image" | "is_carousel_image",
    value: boolean,
  ) => {
    setTogglingImg(imageId);
    try {
      await httpService().put(
        `/admin/properties/${propertyId}/images/${imageId}`,
        { [flag]: String(value) },
      );
      setPropImageFlags((prev) => {
        const n = new Map(prev);
        if (flag === "is_banner_image" && value) {
          detail.images.forEach((pi) => {
            if (pi.image_id !== imageId) {
              const cur = n.get(pi.image_id) ?? {
                is_banner_image: pi.is_banner_image,
                is_carousel_image: pi.is_carousel_image,
              };
              n.set(pi.image_id, { ...cur, is_banner_image: "false" });
            }
          });
        }
        const cur = n.get(imageId) ?? {
          is_banner_image:
            detail.images.find((pi) => pi.image_id === imageId)?.is_banner_image ?? "false",
          is_carousel_image:
            detail.images.find((pi) => pi.image_id === imageId)?.is_carousel_image ?? "false",
        };
        n.set(imageId, { ...cur, [flag]: String(value) });
        return n;
      });
    } catch {
      setError("Failed to update image settings");
    } finally {
      setTogglingImg(null);
    }
  };

  const toggleUnitImageFlag = async (
    imageId: string,
    flag: "is_banner_image",
    value: boolean,
  ) => {
    if (!selectedUnit) return;
    setTogglingImg(imageId);
    try {
      await httpService().put(
        `/admin/properties/${propertyId}/units/${selectedUnit}/images/${imageId}`,
        { [flag]: String(value) },
      );
      setUnitImageFlags((prev) => {
        const n = new Map(prev);
        const unitImgs =
          detail.units.find((u) => u.unit_id === selectedUnit)?.images ?? [];
        if (flag === "is_banner_image" && value) {
          unitImgs.forEach((ui) => {
            if (ui.image_id !== imageId) {
              const cur = n.get(ui.image_id) ?? { is_banner_image: ui.is_banner_image };
              n.set(ui.image_id, { ...cur, is_banner_image: "false" });
            }
          });
        }
        const cur = n.get(imageId) ?? {
          is_banner_image:
            unitImgs.find((ui) => ui.image_id === imageId)?.is_banner_image ?? "false",
        };
        n.set(imageId, { ...cur, [flag]: String(value) });
        return n;
      });
    } catch {
      setError("Failed to update image settings");
    } finally {
      setTogglingImg(null);
    }
  };

  // ── Handlers — Step 3 (bulk unassign) ────────────────────────────────────

  const bulkUnassignProp = async (ids: string[]) => {
    const results = await Promise.allSettled(
      ids.map((id) =>
        httpService().delete(
          `/admin/properties/${propertyId}/images/unassign/${id}`,
        ),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to unassign`);
    } else {
      setSuccess(`${ids.length} image${ids.length > 1 ? "s" : ""} removed from property`);
    }
    onSaved();
  };

  const bulkUnassignUnit = async (ids: string[]) => {
    if (!selectedUnit) return;
    const results = await Promise.allSettled(
      ids.map((id) =>
        httpService().delete(
          `/admin/properties/${propertyId}/units/${selectedUnit}/images/unassign/${id}`,
        ),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to unassign`);
    } else {
      setSuccess(`${ids.length} image${ids.length > 1 ? "s" : ""} removed from unit`);
    }
    onSaved();
  };

  // ── Handlers — Step 3 (drag reorder) ─────────────────────────────────────

  const savePropOrder = async (ordered: AdminPropertyImageDTO[]) => {
    try {
      await Promise.all(
        ordered.map((pi, idx) =>
          httpService().put(`/admin/properties/${propertyId}/images/${pi.image_id}`, {
            display_order: idx,
          }),
        ),
      );
      setSuccess("Property image order saved");
      onSaved();
    } catch {
      setError("Failed to save order");
    }
  };

  const saveUnitOrder = async (ordered: AdminUnitImageDTO[]) => {
    if (!selectedUnit) return;
    try {
      await Promise.all(
        ordered.map((ui, idx) =>
          httpService().put(
            `/admin/properties/${propertyId}/units/${selectedUnit}/images/${ui.image_id}`,
            { display_order: idx },
          ),
        ),
      );
      setSuccess("Unit image order saved");
      onSaved();
    } catch {
      setError("Failed to save order");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <AddToPoolStep
        newImg={newImg}
        categories={categories}
        adding={adding}
        onChange={(patch) => setNewImg((i) => ({ ...i, ...patch }))}
        onAdd={addToPool}
      />

      <Divider />

      <SearchAndAssignStep
        prefix={prefix}
        searching={searching}
        poolImages={poolImages}
        onPrefixChange={setPrefix}
        onSearch={searchPool}
        assignMode={assignMode}
        deleteMode={deleteMode}
        selectedUnit={selectedUnit}
        units={detail.units}
        onAssignModeChange={setAssignMode}
        onDeleteModeToggle={() => setDeleteMode((v) => !v)}
        onSelectedUnitChange={setSelectedUnit}
        selections={selections}
        removing={removing}
        submitting={submitting}
        bulkDeleting={bulkDeleting}
        onToggleSelect={toggleSelect}
        onUpdateSelection={updateSelection}
        onClearSelections={() => setSelections(new Map())}
        onSubmitAssignments={submitAssignments}
        onBulkDelete={bulkDeleteFromPool}
        onDeleteFromPool={deleteFromPool}
        onUnassignProp={unassignProp}
        onUnassignUnit={unassignUnit}
        isCurrentlyAssigned={(imageId) =>
          assignMode === "property"
            ? assignedPropIds.has(imageId)
            : assignedUnitIds(selectedUnit).has(imageId)
        }
      />

      <Divider />

      <CurrentImagesStep
        propertyId={propertyId}
        propertyImages={detail.images}
        units={detail.units}
        selectedUnit={selectedUnit}
        removing={removing}
        togglingImg={togglingImg}
        propImageFlags={propImageFlags}
        unitImageFlags={unitImageFlags}
        onSelectedUnitChange={(v) => {
          setSelectedUnit(v);
        }}
        onUnassignProp={unassignProp}
        onUnassignUnit={unassignUnit}
        onTogglePropFlag={togglePropImageFlag}
        onToggleUnitFlag={toggleUnitImageFlag}
        onSavePropOrder={savePropOrder}
        onSaveUnitOrder={saveUnitOrder}
        onBulkUnassignProp={bulkUnassignProp}
        onBulkUnassignUnit={bulkUnassignUnit}
      />
    </Box>
  );
};
