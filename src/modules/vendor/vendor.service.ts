import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument } from './schemas/vendor.schema';
import {
   CreateVendorDTO,
   LoginVendorDTO,
   UpdateVendorDTO,
} from './dto/vendor.dto';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/interfaces';
import { log } from 'console';

@Injectable()
export class VendorService {
   constructor(
      @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
      private authService: AuthService,
   ) {}

   async createVendor(createVendorDTO: CreateVendorDTO): Promise<string> {
      const newVendor = new this.vendorModel(createVendorDTO);
      try {
         // eslint-disable-next-line no-var
         var vendor = await newVendor.save();
      } catch (error) {
         // got trick here -- insted of searching
         if (error.code === 11000) {
            throw new NotFoundException('Email or Name already exists');
         } else {
            throw new Error(error);
         }
      }
      const payload: JWTPayload = {
         userId: vendor._id,
         username: vendor.name,
      };

      return await this.authService.__generateToken(payload);
   }

   async login(loginVendorDTO: LoginVendorDTO): Promise<string> {
      const vendor = await this.vendorModel.findOne({
         email: loginVendorDTO.email,
      });

      log(vendor);
      if (vendor && !(await vendor.validatePassword(loginVendorDTO.password))) {
         throw new NotFoundException('Invalid credentials');
      }

      const payload: JWTPayload = {
         userId: vendor._id,
         username: vendor.name,
      };
      return await this.authService.__generateToken(payload);
   }

   async getVendors(): Promise<Vendor[]> {
      return await this.vendorModel.find();
   }

   async getVendorById(vendorId: string): Promise<Vendor> {
      const vendor = await this.vendorModel.findById(vendorId).exec();
      if (!vendor) {
         throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
      }
      return vendor;
   }

   async updateVendor(
      vendorId: string,
      updateVendorDTO: UpdateVendorDTO,
   ): Promise<Vendor> {
      const updatedVendor = await this.vendorModel
         .findByIdAndUpdate(vendorId, updateVendorDTO, { new: true })
         .exec();
      if (!updatedVendor) {
         throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
      }
      return updatedVendor;
   }

   async deleteVendor(vendorId: string): Promise<Vendor> {
      const deletedVendor = await this.vendorModel
         .findByIdAndDelete(vendorId)
         .exec();
      if (!deletedVendor) {
         throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
      }
      return deletedVendor;
   }
}
