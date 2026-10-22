import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormularioTarea } from "./FormularioTarea";

describe("FormularioTarea", () => {
  it("no agrega nada y muestra un error si el título está vacío", async () => {
    const onAgregar = vi.fn();
    render(<FormularioTarea onAgregar={onAgregar} onGuardar={vi.fn()} tareaEnEdicion={null} />);

    await userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    expect(onAgregar).not.toHaveBeenCalled();
    expect(screen.getByText(/obligatorio/i)).toBeInTheDocument();
  });

  it("llama a onAgregar con el título y la descripción", async () => {
    const onAgregar = vi.fn();
    render(<FormularioTarea onAgregar={onAgregar} onGuardar={vi.fn()} tareaEnEdicion={null} />);

    await userEvent.type(screen.getByPlaceholderText(/t[ií]tulo/i), "Estudiar");
    await userEvent.type(screen.getByPlaceholderText(/descripci[oó]n/i), "Lección 9");
    await userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    expect(onAgregar).toHaveBeenCalledWith({ titulo: "Estudiar", descripcion: "Lección 9" });
  });
});