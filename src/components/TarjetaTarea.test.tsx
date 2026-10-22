import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TarjetaTarea } from "./TarjetaTarea";
import type { Tarea } from "../types/Tarea";

const tarea: Tarea = {
  id: "abc123",
  titulo: "Comprar leche",
  descripcion: "Deslactosada",
  completada: false,
  userId: "usuario-1",
};

describe("TarjetaTarea", () => {
  it("muestra el título, la descripción y el estado pendiente", () => {
    render(
      <TarjetaTarea tarea={tarea} onEliminar={vi.fn()} onEditar={vi.fn()} onCompletar={vi.fn()} />
    );
    expect(screen.getByText("Comprar leche")).toBeInTheDocument();
    expect(screen.getByText("Deslactosada")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("muestra 'Tarea Completada' cuando está completada", () => {
    render(
      <TarjetaTarea
        tarea={{ ...tarea, completada: true }}
        onEliminar={vi.fn()}
        onEditar={vi.fn()}
        onCompletar={vi.fn()}
      />
    );
    expect(screen.getByText("Tarea Completada")).toBeInTheDocument();
  });

  it("llama a onEliminar con el id de la tarea", async () => {
    const onEliminar = vi.fn();
    render(
      <TarjetaTarea tarea={tarea} onEliminar={onEliminar} onEditar={vi.fn()} onCompletar={vi.fn()} />
    );
    await userEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(onEliminar).toHaveBeenCalledWith("abc123");
  });
});