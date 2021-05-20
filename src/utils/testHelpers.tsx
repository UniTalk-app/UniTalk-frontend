import React from "react";

import { render, RenderResult } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { StyleProvider } from "Providers";

export function renderWithProviders(tree: React.ReactNode): RenderResult {
    return render(
        <SnackbarProvider>
            <StyleProvider>
                {tree}
            </StyleProvider>
        </SnackbarProvider>
    );
}