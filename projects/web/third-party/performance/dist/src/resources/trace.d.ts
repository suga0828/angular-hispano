/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Counter } from './counter';
export declare class Trace {
    readonly name: string;
    readonly isAuto: boolean;
    private state;
    startTimeUs: number;
    durationUs: number;
    private customAttributes;
    counters: {
        [counterName: string]: Counter;
    };
    private api;
    private randomId;
    private traceStartMark;
    private traceStopMark;
    private traceMeasure;
    /**
     *
     * @param name The name of the trace.
     * @param isAuto If the trace is auto-instrumented.
     * @param traceMeasureName The name of the measure marker in user timing specification. This field
     * is only set when the trace is built for logging when the user directly uses the user timing
     * api (performance.mark and performance.measure).
     */
    constructor(name: string, isAuto?: boolean, traceMeasureName?: string);
    /**
     * Start a trace. The measurement of the duration starts at this point.
     */
    start(): void;
    /**
     * Stop the trace. The measurement of the duration of the trace stops at this point and trace
     * is logged.
     */
    stop(): void;
    /**
     * Record a trace with predetermined values. If this method is used a trace is created and logged
     * directly. No need to use start and stop methods.
     * @param startTime Trace start time since epoch in millisec
     * @param duration The duraction of the trace in millisec
     * @param options An object which can optionally hold maps of custom metrics and custom attributes
     */
    record(startTime: number, duration: number, options?: {
        metrics?: {
            [key: string]: number;
        };
        attributes?: {
            [key: string]: string;
        };
    }): void;
    /**
     * Increment a custom metric by a certain number or 1 if number not specified. Will create a new
     * custom metric if one with the given name does not exist.
     * @param counter Name of the custom metric
     * @param num Increment by value
     */
    incrementMetric(counter: string, num?: number): void;
    /**
     * Set a custom metric to a specified value. Will create a new custom metric if one with the
     * given name does not exist.
     * @param counter Name of the custom metric
     * @param num Set custom metric to this value
     */
    putMetric(counter: string, num: number): void;
    /**
     * Returns the value of the custom metric by that name. If a custom metric with that name does
     * not exist will return zero.
     * @param counter
     */
    getMetric(counter: string): number;
    /**
     * Set a custom attribute of a trace to a certain value.
     * @param attr
     * @param value
     */
    putAttribute(attr: string, value: string): void;
    /**
     * Retrieve the value a custom attribute of a trace is set to.
     * @param attr
     */
    getAttribute(attr: string): string | undefined;
    removeAttribute(attr: string): void;
    getAttributes(): {
        [key: string]: string;
    };
    getCounters(): {
        [key: string]: number;
    };
    private setStartTime;
    private setDuration;
    /**
     * Calculates and assigns the duration and start time of the trace using the measure performance
     * entry.
     */
    private calculateTraceMetrics;
    static createOobTrace(eventsTiming: any[], paintTimings: any[], fid?: number): void;
    /**
     *
     * @param measureName
     */
    static createUserTimingTrace(measureName: string): void;
}