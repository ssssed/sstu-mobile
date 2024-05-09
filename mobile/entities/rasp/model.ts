import {createStore, useStore} from "quark-store";
import {Clearable, FetchStatus} from "@/entities/public";
import {request} from "@/shared/lib/axios";
import {HttpStatus} from "@/shared/config/status";

type GroupType = {
  name: string,
  href: string,
  groupId: number
}

type TeacherType = {
  name: string;
  href: string
}

type LessonType = {
  hour: string;
  room: string;
  name: string;
  type: string;
  teacher: TeacherType
}

type DateType = {
  day: string;
  lessons: LessonType[]
}

export class RaspStore implements Clearable {
  private _groups = createStore<GroupType[]>([]);
  private _calendar = createStore<DateType[]>([])

  private _groupsLoading = createStore<boolean>(false);
  private _groupsStatus = createStore<FetchStatus>('none');

  private _calendarLoading = createStore<boolean>(false);
  private _calendarStatus = createStore<FetchStatus>('none');

  private _variables: Clearable[] = [this._groups, this._groupsLoading, this._groupsStatus, this._calendar, this._calendarLoading, this._calendarStatus];

  private constructor() {
  }

  get groups(): GroupType[] {
    return useStore(this._groups);
  }

  set groups(groups: GroupType[]) {
    this._groups.set([...groups]);
  }

  get groupsLoading() {
    return useStore(this._groupsLoading)
  }

  async fetchGroups(): Promise<void> {
    try {
      this._groupsLoading.set(true);
      const {data, status} = await request.get<GroupType[]>('/parser/groups');

      if (status === HttpStatus.OK) {
        this._groupsStatus.set('ok')
        this._groups.set(data);
      }

    } catch (e) {
      this._groupsStatus.set('error')
      console.error(e);
    } finally {
      this._groupsLoading.set(false);
    }
  }

  get calendar(): DateType[] {
    return useStore(this._calendar);
  }

  set calendar(calendar: DateType[]) {
    this._calendar.set([...calendar]);
  }

  get calendarLoading() {
    return useStore(this._calendarLoading)
  }

  async fetchCalendar(group: string): Promise<void> {
    try {
      this._calendarLoading.set(true);
      const {data, status} = await request.post<DateType[]>('/parser/schedule', {
        name: group
      });

      if (status === HttpStatus.OK) {
        this._calendarStatus.set('ok')
        this._calendar.set(data);
      }

    } catch (e) {
      this._calendarStatus.set('error')
      console.error(e);
    } finally {
      this._calendarLoading.set(false);
    }
  }

  clear() {
    this._variables.forEach(store => store.clear());
  }

  static instance = new RaspStore();
}