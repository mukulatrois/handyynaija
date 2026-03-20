import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GalleryImage = {
  uri: string;
  type?: string;
  fileName?: string;
};

export type ListingWizardStep =
  | 'createService'
  | 'listingPrice'
  | 'listingInformationInterest'
  | 'listingGallery'
  | 'listingAboutMe'
  | 'listingPhone'
  | 'listingVerification';

export type ListingDraftState = {
  // Local-only identifier used to keep multiple saved drafts separate.
  draftId?: string;
  activeStep: ListingWizardStep;
  serviceName?: string;

  price?: string;
  galleryImages: GalleryImage[];

  experience?: string;
  industry?: string;
  status?: string;
  statement?: string;

  aboutMeDescription?: string;
  phoneNumber?: string;

  updatedAt?: number;
};

const initialState: ListingDraftState = {
  draftId: undefined,
  activeStep: 'createService',
  serviceName: undefined,
  price: '',
  galleryImages: [],
  experience: '',
  industry: '',
  status: '',
  statement: '',
  aboutMeDescription: '',
  phoneNumber: '',
  updatedAt: undefined,
};

const listingDraftSlice = createSlice({
  name: 'listingDraft',
  initialState,
  reducers: {
    restoreListingDraft(state, action: PayloadAction<ListingDraftState>) {
      // Replace the entire draft so the user can resume from saved progress.
      Object.assign(state, action.payload);
      state.updatedAt = Date.now();
    },
    setActiveStep(state, action: PayloadAction<ListingWizardStep>) {
      state.activeStep = action.payload;
      state.updatedAt = Date.now();
    },
    setServiceName(state, action: PayloadAction<string | undefined>) {
      state.serviceName = action.payload;
      state.updatedAt = Date.now();
    },
    setPrice(state, action: PayloadAction<string>) {
      state.price = action.payload;
      state.updatedAt = Date.now();
    },
    setGalleryImages(state, action: PayloadAction<GalleryImage[]>) {
      state.galleryImages = action.payload;
      state.updatedAt = Date.now();
    },
    setExperience(state, action: PayloadAction<string>) {
      state.experience = action.payload;
      state.updatedAt = Date.now();
    },
    setIndustry(state, action: PayloadAction<string>) {
      state.industry = action.payload;
      state.updatedAt = Date.now();
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
      state.updatedAt = Date.now();
    },
    setStatement(state, action: PayloadAction<string>) {
      state.statement = action.payload;
      state.updatedAt = Date.now();
    },
    setAboutMeDescription(state, action: PayloadAction<string>) {
      state.aboutMeDescription = action.payload;
      state.updatedAt = Date.now();
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
      state.updatedAt = Date.now();
    },
    resetListingDraft(state) {
      Object.assign(state, initialState);
      state.updatedAt = Date.now();
    },
  },
});

export const {
  restoreListingDraft,
  setActiveStep,
  setServiceName,
  setPrice,
  setGalleryImages,
  setExperience,
  setIndustry,
  setStatus,
  setStatement,
  setAboutMeDescription,
  setPhoneNumber,
  resetListingDraft,
} = listingDraftSlice.actions;

export default listingDraftSlice.reducer;

