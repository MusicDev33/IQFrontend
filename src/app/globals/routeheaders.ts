import { HttpHeaders } from '@angular/common/http';

export let BaseHeaders = new HttpHeaders();

BaseHeaders = BaseHeaders.set('Content-Type', 'application/json');
BaseHeaders = BaseHeaders.set('IQ-User-Agent', 'IQAPIv1');
