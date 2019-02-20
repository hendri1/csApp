export interface UserInterface {
  fullname: string;
  ohtername: string;
  dob: string;
  drivers_license: string;
  employer: string;
  address: address;
}

export interface address {
  address: string;
  first_reported: string;
  last_reported: string;
}