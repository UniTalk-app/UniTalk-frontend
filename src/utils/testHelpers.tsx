import React from "react";

import { render, RenderResult } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { StyleProvider } from "Providers";
import * as STORE from "pages/HomePage/store/StoreProvider";

export function renderWithProviders(tree: React.ReactNode): RenderResult {
    return render(
        <SnackbarProvider>
            <StyleProvider>
                {tree}
            </StyleProvider>
        </SnackbarProvider>
    );
}

export function mockMainData(mockObject: Partial<MainPageStoreData> = {}): void {
    jest.spyOn(STORE, "useMainData").mockImplementation(() => ({
        groups: () => [],
        categories: () => [],
        getData: jest.fn(),
        threads: () => [],
        subscribeToServiceChange: jest.fn(),
        ...mockObject
    }));
}