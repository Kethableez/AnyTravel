import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  transform(label: any): string {
    switch (label) {
      // Sorting
      case 'NAME_ASC':
        return 'Nazwa rosnąco';

      case 'NAME_DESC':
        return 'Nazwa malejąco';

      case 'RATING_ASC':
        return 'Ocena rosnąco';

      case 'RATING_DESC':
        return 'Ocena malejąco';
      // Filter key
      case 'country':
        return 'Kraj';

      case 'city':
        return 'Miasto';

      case 'attractionType':
        return 'Typ';

      case 'catetory':
        return 'Kategoria';

      case 'ticketPrice':
        return 'Cena biletów';

      //Category
      case 'RESTAURANT':
        return 'Restauracja';

      case 'MUSEUM':
        return 'Muzeum';

      case 'LIBRARY':
        return 'Biblioteka';

      case 'PARK':
        return 'Park';

      case 'BEACH':
        return 'Plaża';

      case 'LAKE':
        return 'Jezioro';

      case 'FOREST':
        return 'Las';

      case 'ART':
        return 'Sztuka';

      case 'GYM':
        return 'Siłownia';

      case 'COFFEE':
        return 'Kawiarnia';

      case 'BAR':
        return 'Bar';

      //Type
      case 'INDOOR':
        return 'Wewnątrz';

      case 'OUTDOOR':
        return 'Na zewnątrz';

      //TicketPrice
      case 'Free':
        return 'Bezpłatne';

      case '$':
        return 'Tanie';

      case '$$':
        return 'Umiarkowane';

      case '$$$':
        return 'Drogie';

      case '$$$$':
        return 'Bardzo drogie';

      case 'all':
        return 'Wszystkie';

      case 'future':
        return 'Nadchodzące';

      case 'past':
        return 'Przeszłe';

      default:
        return label;
    }
  }
}
