import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { FilterSidebarModule } from '../../components/other/filter-sidebar/filter-sidebar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    FilterSidebarModule,
    CommonModule,
    RouterModule
  ],
  exports: [FiltersComponent]
})
export class FiltersModule { }
