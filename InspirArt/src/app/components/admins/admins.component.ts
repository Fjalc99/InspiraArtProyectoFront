import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../services/admins.service';
import { AdminDto } from '../../interfaces/AdminDto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit {

  admins: AdminDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private adminsService: AdminsService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  async loadAdmins() {
  try {
    const data: any = await firstValueFrom(this.adminsService.getAdmins(this.page, this.size));
    this.admins = data.content;
    this.totalPages = data.totalPages;
  } catch (error) {
    console.error('Error fetching admins:', error);
    this.admins = [];
    this.totalPages = 0;
  }
}

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadAdmins();
    }
  }

}
