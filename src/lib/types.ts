export interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
} 